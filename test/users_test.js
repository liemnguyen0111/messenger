let expect = require('chai').expect

describe('addUser', () =>
{
    // Import addUser from utils/users_methods
    let addUser = require('../utils/users_methods').addUser

    // Add new user with a given userID and socketID
    it('Should correctly add new user with a given userID and socketID', () =>
    {
        User = { 
            userID : '123456',
            socketID : '789789'
        }
        expect(addUser('123456', '789789')).to.deep.equal(User)
    })

      // Add new user with a given userID and socketID
      it('Should correctly add new user with a given userID and socketID', () =>
      {
          users = [
              { 
              userID : '123456',
              socketID : '789789'
             },
             { 
                userID : '123456',
                socketID : '3456'
            }
        ]

          expect(addUser('123456', '3456')).to.not.equal(users[0])
          expect(addUser('123456', '3456')).to.deep.equal(users[1])
      })
})

describe('updateUserSocketID', () =>
{
    let updateUserSocketID = require('../utils/users_methods').updateUserSocketID
    let User = require('../utils/users')

    // update user socketID
    it('Should correctly update user socketID', () =>
    {
        users = []
        users.push(new User(1,5))
        users.push(new User(2,6))
        users.push(new User(3,7))
        users.push(new User(4,8))

        expect(updateUserSocketID(users[0], 9)).to.deep.equal({userID : 1 , socketID : 9})
        expect(updateUserSocketID(users[0], 5)).to.deep.equal({userID : 1 , socketID : 5})
        expect(updateUserSocketID(users[1], 9)).to.not.equal({userID : 1 , socketID : 8})
        expect(updateUserSocketID(users[2], 5)).to.not.equal({userID : 1 , socketID : 4})
        expect(updateUserSocketID(users[3], 10)).to.not.equal({userID : 1 , socketID : 8})
    })
})

describe('getAllUsers', () =>
{
    // Import addUser from utils/users_methods
    let addUser = require('../utils/users_methods').addUser
    // Import getAllUsers from utils/users_methods
    let getAllUsers = require('../utils/users_methods').getAllUsers
    let User = require('../utils/users')

    // get all users socket id with a given ID's range
    it(`Should correctly return all the users with an given ID's range inluding socketID`, () =>
    {
        users = []
        users.push(new User(1,5))
        users.push(new User(2,6))
        users.push(new User(3,7))
        users.push(new User(4,8))
        users.push(new User(5,9))

        addUser(1,5)
        addUser(2,6)
        addUser(3,7)
        addUser(4,8)
        addUser(5,9)

        expect(getAllUsers([1,2,3,4,5])).to.deep.equal(users)
        expect(getAllUsers([1,3,5,4,2])).to.deep.equal(users)
        expect(getAllUsers([1,5,3,4,2])).to.deep.equal(users)
    })

        // get all users socket id with a given ID's range
        it(`Should correctly return an empty array`, () =>
        {
            expect(getAllUsers(['11','13','15','17','19'])).to.deep.equal([])
        })

})