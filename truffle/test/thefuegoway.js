const NftContract = artifacts.require('TheFuegoWay');

let instance;

beforeEach(async function () {
  //create contract instance
  instance = await NftContract.deployed();
});

contract('TheFuegoWay', (accounts) => {
  it('should read contract info', async () => {
    const name = await instance.name();
    const symbol = await instance.symbol();

    assert.equal(name, 'The Fuego Way');
    assert.equal(symbol, 'TFW');
  });

  it('should mint a new token', async () => {
    const result = await instance.mint(accounts[0]);
    const totalSupply = await instance.totalSupply();
    const tokenuri = await instance.tokenURI(1);

    assert.equal(totalSupply, 1);
    const event = result.logs[0].args;
    assert.equal(event.tokenId.toNumber(), 1, 'id is correct');
    assert.equal(
      event.from,
      '0x0000000000000000000000000000000000000000',
      'from is correct'
    );
    assert.equal(event.to, accounts[0], 'to is correct');
    console.log(`tokenuri: ${tokenuri}`);
  });
});
