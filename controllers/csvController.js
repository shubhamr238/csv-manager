const FileSchema=require('../models/csvFile');


module.exports.ViewUploadForm=function(req,res){
  res.render('upload', {
    title: "CSV Manager | Upload CSV",
  });
}

module.exports.upload=function(req, res, next){
  const file = req.file;
  if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
  }
  FileSchema.create(file, function(err, file){
      if(err){
          console.log(err);
      }
      console.log(file);
  });
  res.send(file);
  
}