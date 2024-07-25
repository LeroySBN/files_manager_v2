import dbClient from "../../utils/db";

describe('dbClient test', () => {
    it('Connection should return true', () => {
        expect(dbClient.isAlive()).to.be.true;
    })
})