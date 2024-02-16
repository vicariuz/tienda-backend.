export const tracker = (req, _, next) => {
    console.log({
        method: req.method,
        path: req.path,
        query:req.query,
        body: req.body,
        timestamp: new Date(),
    });
    next();  
};