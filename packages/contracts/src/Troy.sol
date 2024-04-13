// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { Ownable2StepUpgradeable } from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import { Client } from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import { CCIPReceiverUpgradeable } from "./CCIPReceiverUpgradeable.sol";

contract Troy is UUPSUpgradeable, Ownable2StepUpgradeable, CCIPReceiverUpgradeable {
    struct TroyStorage {
        uint256 championChainId;
        uint256 soldierAmount;
    }

    event SoldiersArrive(
        uint256 indexed chainId,
        uint256 amount,
        uint256 initChampion,
        uint256 initAmount,
        uint256 laterChainpion,
        uint256 laterAmount
    );

    // keccak256(abi.encode(uint256(keccak256("battleoflayers.storage.troy")) - 1)) & ~ bytes32(uint256(0xff))
    //
    bytes32 private constant TroyStorageLocation = 0xdd3df5464778d98b8f59c24d166861cc7b36f749c939a9173f338d95c7f4fe00;

    function _getTroyStorage() internal pure returns (TroyStorage storage $) {
        assembly {
            $.slot := TroyStorageLocation
        }
    }

    function initialize(address owner_, address router_) external initializer {
        _transferOwnership(owner_);

        __CCIPReceiver_init(router_);
    }

    // only owner can upgrade
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner { }

    // handle a received message
    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        // logic here
        (uint256 srcChainId, uint256 incommingSoldierAmount) = abi.decode(any2EvmMessage.data, (uint256, uint256));

        uint256 championChainId = _getTroyStorage().championChainId;
        uint256 curSoldierAmount = _getTroyStorage().soldierAmount;

        if (srcChainId == championChainId) {
            _getTroyStorage().soldierAmount += incommingSoldierAmount;
        } else {
            if (curSoldierAmount >= incommingSoldierAmount) {
                _getTroyStorage().soldierAmount += incommingSoldierAmount;
            } else {
                _getTroyStorage().soldierAmount = incommingSoldierAmount - curSoldierAmount;
                _getTroyStorage().championChainId = srcChainId;
            }
        }

        emit SoldiersArrive(
            srcChainId,
            incommingSoldierAmount,
            championChainId,
            curSoldierAmount,
            _getTroyStorage().championChainId,
            _getTroyStorage().soldierAmount
        );
    }
}
