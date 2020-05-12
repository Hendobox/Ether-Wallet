const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', (accounts) => {
	let etherWallet = null;
	before(async () => {
		etherWallet = await EtherWallet.deployed();
	});

	it('Should set accounts[0] as owner', async () => {
		const owner = await etherWallet.owner();
		assert(owner === accounts[0]);
	});

	it('Should deposit ether to etherWallet', async () => {
		await etherWallet.deposit({from: accounts[0], value: 1000});
		const balance = await web3.eth.getBalance(etherWallet.address);
		assert(parseInt(balance) === 1000);
	});

	it('Should return the balance of the contract', async() => {
		const balance = await etherWallet.balanceOf();
		assert(parseInt(balance === 1000));
	});

	it('Should transfer ether to another address', async() => {
		const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
		await etherWallet.send(address[1], 300, {from: accounts[0]});
		const balance = await web3.eth.getBalance(etherWallet.address);
		assert(parseInt(balance) === 700);
		const balanceRecipientAfter = await web3.eth.getBalance(accounts[1]);
		assert(parseInt(balanceRecipientAfter) - parseInt(balanceRecipientBefore) === 300);
	});
});