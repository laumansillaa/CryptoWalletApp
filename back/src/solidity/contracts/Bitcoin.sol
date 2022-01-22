pragma solidity ^0.5.0;

contract Bitcoin {

  string public name;
  string public symbol;
  uint256 public totalSupply;
  uint256 public decimals;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  constructor(uint256 _initialSupply) public {
    name = "Bitcoin";
    symbol = "BTC";
    decimals = 4;
    totalSupply = _initialSupply * 10**decimals;
    balanceOf[msg.sender] = _initialSupply * 10**decimals;
  }

  function transfer(address _to, uint256 _value) public returns(bool _success) {
    require (balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns(bool _success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns(bool _success) {
    require (allowance[_from][msg.sender] >= _value);
    require (balanceOf[_from] >= _value);
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
