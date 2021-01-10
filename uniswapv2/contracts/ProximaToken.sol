// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ProximaToken
 * @author ProximusAlpha
 */
contract ProximaToken is ERC20 {
    uint256 private constant _dConst = 10**18;

    uint256 private _fixedSupply = 100000000 * _dConst; // 100M fixed supply.
    uint256 private _rewardEarmark = 76900000 * _dConst; // 76.5% of total supply.
    uint256 private _airDropEarmark = 5000000 * _dConst; // 5% of total supply.
    uint256 private _teamEarmark = 8000000 * _dConst; // 8% of total supply.
    uint256 private _communityDevEarmark = 10000000 * _dConst; // 10% of total supply.
    uint256 private _bootstrapEarmark = 100000 * _dConst; // boot amount is 0.5% of total supply.

    address private rewardFundVault;
    address private airDropFundVault;
    address private teamTokenFundVault;
    address private communityDevFundVault; // owner has access to this fund, will be used for project's communityDev & maintainance only
    address private owner; // owner has access to this fund, for bootstapping the project.

    constructor(
        address _rewardFundVault,
        address _airDropFundVault,
        address _teamTokenFundVault,
        address _communityDevFundVault
    ) public ERC20("Proxima", "PXA") {
        rewardFundVault = _rewardFundVault;
        airDropFundVault = _airDropFundVault;
        teamTokenFundVault = _teamTokenFundVault;
        communityDevFundVault = _communityDevFundVault;
        owner = msg.sender;
        initateVoyage();
    }

    function initateVoyage() internal {
        require(
            _rewardEarmark.add(
                _airDropEarmark.add(
                    _teamEarmark.add(
                        _communityDevEarmark.add(_bootstrapEarmark)
                    )
                )
            ) == _fixedSupply,
            "Minting amount should be equal to fixed supply cap"
        );
        _mint(rewardFundVault, _rewardEarmark);
        _mint(airDropFundVault, _airDropEarmark);
        _mint(teamTokenFundVault, _teamEarmark);
        _mint(communityDevFundVault, _communityDevEarmark);
        _mint(owner, _bootstrapEarmark);
    }
}
