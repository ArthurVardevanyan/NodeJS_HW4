exports.getAll = async (query, Model) => Model.find(query).select('-_id -__v');
