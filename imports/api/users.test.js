import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';

import { validateNewUser } from './users';

if (Meteor.isServer) {

  describe("users", function () {

    it('should allow  valid email address', function () {
      const testUser = {
        emails: [{ address: "Test@example.com" }]
      };
      expect(validateNewUser(testUser)).to.be.true;
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [{ address: "invalidEmail.com" }]
      };

      expect(() => {
        validateNewUser(testUser);
      }).to.throw();
    });

  });
}
