// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) private value;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;

    event FileUploaded(address indexed user, string fileUrl);
    event AccessGranted(address indexed owner, address indexed sharedWith);
    event AccessRevoked(address indexed owner, address indexed revokedFrom);

    // Function to add a file
    function add(string memory url) external {
        require(bytes(url).length > 0, "File URL cannot be empty");
        
        value[msg.sender].push(url);
        ownership[msg.sender][msg.sender] = true;  // Ensure owner always has access

        emit FileUploaded(msg.sender, url);
    }

    // Grant access to another user
    function allow(address user) external {
        require(user != msg.sender, "Cannot grant access to yourself");
        require(!ownership[msg.sender][user], "User already has access");

        ownership[msg.sender][user] = true;

        // Check if user already exists in accessList
        bool found = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = true;
                found = true;
                break;
            }
        }

        // Add user only if not found
        if (!found) {
            accessList[msg.sender].push(Access(user, true));
        }

        emit AccessGranted(msg.sender, user);
    }

    // Revoke access from a user
    function revoke(address user) external {
        require(user != msg.sender, "Cannot revoke access from yourself");
        require(ownership[msg.sender][user], "User does not have access");

        ownership[msg.sender][user] = false;

        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i] = accessList[msg.sender][
                    accessList[msg.sender].length - 1
                ];
                accessList[msg.sender].pop();
                break;
            }
        }

        emit AccessRevoked(msg.sender, user);
    }

    // Display uploaded files if the caller has access
    function display(address _user) external view returns (string[] memory) {
        bool hasAccess = msg.sender == _user || ownership[_user][msg.sender];
        require(hasAccess, "You do not have access to these files");

        return value[_user]; // Return the stored file URLs
    }

    // Get shared access list
    function sharedAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    // Fallback function to prevent unintended transactions
    fallback() external payable {
        revert("Direct payments are not accepted");
    }

    receive() external payable {
        revert("Contract does not accept Ether");
    }
}


