const Admin=require('../models/AdminModel.js');
const UserDB = require('../models/UserModel.js');


// GET /api/search?q=searchTerm
const searchAPI= async (searchTerm) => {
    
    try {
      // Use MongoDB's text search to find matching items
      const admins = await Admin.find({ 
          "username":{$regex:searchTerm,$options:"i"},
          "email":{$regex:searchTerm,$options:"i"},
        });
      const users = await UserDB.find({ 
          "username":{$regex:searchTerm,$options:"i"},
          "email":{$regex:searchTerm,$options:"i"},
        });

        // console.log(items);
        const results = [];
        admins.forEach(ele => {
            results.push({username:ele.username,email:ele.email,_id:ele._id});            
        });

        users.forEach(ele => {
            results.push({username:ele.username,email:ele.email,_id:ele._id});            
        });
        return JSON.parse(JSON.stringify(results));
    } 
    catch (err) {
      console.error('Error searching items:', err);
      return { error: 'An error occurred while searching items' };
    }

}    
module.exports = {searchAPI}; 
