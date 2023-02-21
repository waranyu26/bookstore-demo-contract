import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BookStore", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBookStoreFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BookStore = await ethers.getContractFactory("BookStore");
    const bookstore = await BookStore.deploy();

    return { bookstore, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should have the right token name", async function () {
      const { bookstore } = await loadFixture(deployBookStoreFixture);

      expect(await bookstore.name()).to.equal("BookStore");
    });

    it("Should have the right token symbol", async function () {
      const { bookstore } = await loadFixture(deployBookStoreFixture);

      expect(await bookstore.symbol()).to.equal("BST");
    });
  });

  describe("Transactions", function () {
    describe("Add new items", function () {
      it("Should mint a new token", async function () {
        const { bookstore } = await loadFixture(deployBookStoreFixture);
        await bookstore.newItem("Test URI", 5);

        await expect(await bookstore.tokenURI(1)).to.be.equal("Test URI");
      });

      it("Should mint and transfer new token to user", async function () {
        const { bookstore, owner } = await loadFixture(deployBookStoreFixture);
        await bookstore.newItem("Test URI", 5);

        await expect(await bookstore.balanceOf(owner.address)).to.be.equal(1);
      });
    });

    describe("List item on marketplace", function () {
      it("Should list item on marketplace", async function () {
        const { bookstore } = await loadFixture(deployBookStoreFixture);
        await bookstore.newItem("Test URI", 5);
        await bookstore.listOnMarketplace(1, "1000000000000000000");

        const marketplaceData = await bookstore.marketplace(1);

        await expect(marketplaceData.listing).to.be.equal(true);
        await expect(marketplaceData.price).to.be.equal("1000000000000000000");
      });

      it("Should remove item on marketplace", async function () {
        const { bookstore } = await loadFixture(deployBookStoreFixture);
        await bookstore.newItem("Test URI", 5);

        await bookstore.listOnMarketplace(1, "1000000000000000000");
        await bookstore.removeFromMarketplace(1);

        const marketplaceData = await bookstore.marketplace(1);
        await expect(marketplaceData.listing).to.be.equal(false);
        
      });
    });

    describe("Purchase", function () {
      it("Should be able to purchase item from marketplace", async function () {
        const { bookstore, otherAccount } = await loadFixture(
          deployBookStoreFixture
        );
        await bookstore.newItem("Test URI", 5);
        await bookstore.listOnMarketplace(1, "1000000000000000000");

        await expect(
          bookstore
            .connect(otherAccount)
            .purchase(1, { value: "1000000000000000000" })
        ).not.to.be.reverted;
      });
    });
  });
});
