const Admin=require('../models/AdminModel.js');
const UserDB = require('../models/UserModel.js');


// GET /api/search?q=searchTerm
const searchAPI= async (term) => {
 const searchTerm=term.toLowerCase();
    
    try {
      // Use MongoDB's text search to find matching items
      const results = [];

      const users = await UserDB.find({$or:[{ 
          'username':{$regex:searchTerm,$options:"i"}
        }]});
        users.forEach(ele => {
          results.push({username:ele.username,email:ele.email,_id:ele._id});            
      });

      const admins = await Admin.find({ 
          "username":{$regex:searchTerm,$options:"i"}
        });
        admins.forEach(ele => {
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
