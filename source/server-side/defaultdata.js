var defaultData_typ = function () {

    this.dirObject = {
        "5SYSTEMUSR": {
            "name": "System",
            "username": "System",
            "firstname": "System",
            "lastname": "Boss",
            "email": "system@pragm.de",
            "password": "boss",
            "parent": "4ROOTFOLDR",
            "owner": "5SYSTEMUSR",
            "userRight": "0",
            "content": ["4ROOTFOLDR", "4DELETED00", "4DEADOBJEC","4SHARENOBO"],
            "share": {},
            "maxStorageScore": 5368709120,
            "inviteKeyArray": [],
            "active": true,
            "lastactive": 0,
            "storageScore": 0
        },
        "5GUESTUSER": {
            "owner": "5GUESTUSER",
            "parent": "4ROOTFOLDR",
            "name": "Guest",
            "username": "Guest",
            "firstname": "Max",
            "lastname": "Mustermann",
            "email": "max.mustermann@gmail.com",
            "password": "Guest",
            "userRight": 3,
            "content": [],
            "share": {},
            "maxStorageScore": 20000000,
            "storageScore": 0,
            "active": true,
            "lastactive": 0
        },
        "4ROOTFOLDR": {
            "name": "root",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": ["5SYSTEMUSR", "5GUESTUSER"],
            "share": {},
            "lastmod": 0
        },
        "4DEADOBJEC": {
            "name": "dead objects",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        },
        "4SHARENOBO": {
            "name": "Unknown Shares",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        },
        "4DELETED00": {
            "name": "DELETED",
            "parent": "5SYSTEMUSR",
            "owner": "5SYSTEMUSR",
            "content": [],
            "share": {},
            "lastmod": 0
        }
    }

};


var defaultData = new defaultData_typ();