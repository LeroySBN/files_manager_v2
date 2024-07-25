import redisClient from "../../utils/redis";

describe('dbClient test', () => {
    it('Connection should return true', () => {
        expect(redisClient.isAlive()).to.be.true;
    })
})