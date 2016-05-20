var sendFile = function(path){
  return {
    path: path,
    send:function(req, res){
      return res.status(200).json({
        message: "hello",
        id: "1"
      });
    }
  };
};

module.exports = sendFile;