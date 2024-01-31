
async function main() {
  
    const lock = await hre.ethers.deployContract("Marketplace");
  
    await lock.waitForDeployment();
  
    console.log(
      `Lock with deployed to ${lock.target}`
    );
  }
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  