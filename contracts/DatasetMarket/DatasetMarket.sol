pragma solidity ^0.4.11;

import "../Kiosk.sol";
import "../StandardMarket.sol";
import "./Dataset/AbstractDataset.sol";
import "../utils/strings.sol";
import "../utils/StringUtils.sol";

contract DatasetMarket is StandardMarket {
	using strings for *;
	using StringUtils for *;

	string public name = "Dataset Market";

	// Dataset Registry
	AbstractDataset public dsm;

	struct Domain {
		address seller;
		string name;
		bytes32 node;
		uint256 price;
		bool available;
	}

	// DIN => Dataset Node
	mapping(uint256 => Domain) public domains;

	// Buyer => Dataset Node
	mapping(address => bytes32) public expected;

	// Seller => Aggregate value of sales (in Tokens)
	mapping(address => uint256) public pendingWithdrawals;

	enum Errors {
		INCORRECT_OWNER,
		INCORRECT_TLD,
		INCORRECT_NAMEHASH,
		DOMAIN_NOT_TRANSFERRED
	}

	event LogError(uint8 indexed errorId);
	
	// Constructor
	function DatasetMarket(Kiosk _kiosk, AbstractDataset _dsm) StandardMarket(_kiosk) {
		dsm = _dsm;
	}

	function isFulfilled(uint256 orderId) constant returns (bool) {
		address buyer = orderStore.buyer(orderId);
		bytes32 node = expected[buyer];

		// Check that buyer is the owner of the domain;
		return (dsm.owner(node) == buyer);
	}

	function buy(
			uint256 DIN,
			uint256 quantity,
			uint256 value,
			address buyer,
			bool approved
		)

		only_buy
		returns (bool)

	{
        // Expect the buyer to own the domain at the end of the transaction.
        expected[buyer] = domains[DIN].node;

		// Each DIN represents a single domain.
		require(quantity == 1);

		// Verify that the price is correct, unless the Buy contract pre-approves the transaction.
		if (approved == false) {
			require(value == domains[DIN].price);
		}

		// Give ownership of the node to the buyer.
		dsm.setOwner(domains[DIN].node, buyer);

		// Update pending withdrawals for the seller.
		address seller = domains[DIN].seller;
		pendingWithdrawals[seller] += value;

		// Remove domain from storage.
		delete domains[DIN];
	}

		function withdraw() {
		uint256 amount = pendingWithdrawals[msg.sender];
		pendingWithdrawals[msg.sender] = 0;

		KMT.transfer(msg.sender, amount);
	}

	function nameOf(uint256 DIN) constant returns (string) {
		return domains[DIN].name;
	}

	function metadata(uint256 DIN) constant returns (bytes32) {
		return domains[DIN].node;
	}

	function totalPrice(uint256 DIN, uint256 quantity, address buyer) constant returns (uint256) {
		require (quantity == 1);
		require (domains[DIN].available == true);

		// Let a seller remove a domain from the market for free.
		if (msg.sender == domains[DIN].seller) {
			return 0;
		}

		return domains[DIN].price;
	}

	function availableForSale(uint256 DIN, uint256 quantity, address buyer) constant returns (bool) {
		if (quantity != 1) {
			return false;
		}

		// The owner of the domain must be able to transfer it during a purchase.
		// This means the market must hold the domain for the transaction to succeed.
		bytes32 node = domains[DIN].node;

		// Verify that ENSMarket is the owner of the domain.
		if (dsm.owner(node) != address(this)) {
			return false;
		}

		return domains[DIN].available;
	}

	function setDomain(
		uint256 DIN,
		string name,
		bytes32 node,
		uint256 price,
		bool available
	)
		only_owner(DIN)
	{
		if (dsm.owner(node) != msg.sender) {
			LogError(uint8(Errors.INCORRECT_OWNER));
			return;
		}

		if (node != namehash(name)) {
			LogError(uint8(Errors.INCORRECT_NAMEHASH));
			return;
		}

		// https://github.com/Arachnid/solidity-stringutils#extracting-the-middle-part-of-a-string
		var s = name.toSlice();
		strings.slice memory part;
		string memory domain = s.split(".".toSlice(), part).toString();
		string memory tld = s.split(".".toSlice(), part).toString();

		if (tld.equal("eth") == false) {
			LogError(uint8(Errors.INCORRECT_TLD));
			return;
		}

		domains[DIN].seller = msg.sender;
		domains[DIN].name = name;
		domains[DIN].node = node;
		domains[DIN].price = price;
		domains[DIN].available = available;
	}

	function getNode(uint256 DIN) constant returns (bytes32) {
		return domains[DIN].node;
	}

	function setPrice(uint256 DIN, uint256 price) only_owner(DIN) {
		domains[DIN].price = price;
	}

	function setAvailable(uint256 DIN, bool available) only_owner(DIN) {
		domains[DIN].available = available;
	}

	function pendingWihdrawal(address seller) constant returns (uint256) {
		return pendingWithdrawals[seller];
	}

	function namehash(string name) constant returns(bytes32) {
        var s = name.toSlice();

        if (s.len() == 0) {
            return bytes32(0);
        }

        var label = s.split(".".toSlice()).toString();
        return keccak256(namehash(s.toString()), keccak256(label));
    }

}