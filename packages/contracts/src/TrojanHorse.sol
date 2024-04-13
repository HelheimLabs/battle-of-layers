// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { Ownable2StepUpgradeable } from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import { IRouterClient } from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import { Client } from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import { LinkTokenInterface } from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract TrojanHorse is UUPSUpgradeable, Ownable2StepUpgradeable {
    struct TrajonHorseStorage {
        IRouterClient router;
        AggregatorV3Interface aggregator;
        uint64 destinationChainSelector;
        address receiver;
    }

    // keccak256(abi.encode(uint256(keccak256("battleoflayers.storage.trajonhorse")) - 1)) & ~ bytes32(uint256(0xff))
    //
    bytes32 private constant TrajanHorseStorageLocation =
        0xe27341574ccce45f37dcd0b599bb3930a0505a29c9f7d7964beef8d73580ce00;

    // Event emitted when a message is sent to another chain.
    event HorseSent( // The unique ID of the CCIP message.
    bytes32 indexed messageId, uint256 soldierAmount, uint256 fees);

    error NotEnoughBalance();

    function _getTrajanHorseStorage() internal pure returns (TrajonHorseStorage storage $) {
        assembly {
            $.slot := TrajanHorseStorageLocation
        }
    }

    function initialize(
        address owner_,
        address router_,
        address aggregator_,
        uint256 chainSelector_,
        address receiver_
    )
        external
        initializer
    {
        _transferOwnership(owner_);

        TrajonHorseStorage storage $ = _getTrajanHorseStorage();
        $.router = IRouterClient(router_);
        $.aggregator = AggregatorV3Interface(aggregator_);
        $.destinationChainSelector = uint64(chainSelector_);
        $.receiver = receiver_;
    }

    // only owner can upgrade
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner { }

    // function

    /// @notice Sends data to receiver on the destination chain.
    /// @return messageId The ID of the message that was sent.
    function sendHorse(uint256 fundForSoldiers) external payable onlyOwner returns (bytes32 messageId) {
        (, int256 answer,,,) = _getTrajanHorseStorage().aggregator.latestRoundData();
        uint8 decimal = _getTrajanHorseStorage().aggregator.decimals();
        uint256 soldierAmount = fundForSoldiers * uint256(answer) / (10 ** decimal * 1 ether);

        address receiver = _getTrajanHorseStorage().receiver;
        uint64 destinationChainSelector = _getTrajanHorseStorage().destinationChainSelector;

        // encode data
        bytes memory data = abi.encode(block.chainid, soldierAmount);

        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded
            data: data, // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({ gasLimit: 200_000 })
            ),
            // Set the feeToken  address, use native token
            feeToken: address(0)
        });

        // Get the fee required to send the message
        uint256 fees = _getTrajanHorseStorage().router.getFee(destinationChainSelector, evm2AnyMessage);

        if (msg.value - fundForSoldiers < fees) {
            revert NotEnoughBalance();
        }

        // Send the message through the router and store the returned message ID
        messageId = _getTrajanHorseStorage().router.ccipSend{ value: fees }(destinationChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit HorseSent(messageId, soldierAmount, fees);

        // Return the message ID
        return messageId;
    }

    function getFee(uint256 fundForSoldiers) public view returns (uint256 fees, uint256 soldierAmount) {
        (, int256 answer,,,) = _getTrajanHorseStorage().aggregator.latestRoundData();
        uint8 decimal = _getTrajanHorseStorage().aggregator.decimals();
        soldierAmount = fundForSoldiers * uint256(answer) / (10 ** decimal * 1 ether);

        address receiver = _getTrajanHorseStorage().receiver;
        uint64 destinationChainSelector = _getTrajanHorseStorage().destinationChainSelector;

        // encode data
        bytes memory data = abi.encode(block.chainid, soldierAmount);

        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded
            data: data, // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({ gasLimit: 200_000 })
            ),
            // Set the feeToken  address, use native token
            feeToken: address(0)
        });

        // Get the fee required to send the message
        fees = _getTrajanHorseStorage().router.getFee(destinationChainSelector, evm2AnyMessage);
    }
}
