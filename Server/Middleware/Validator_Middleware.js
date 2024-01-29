// 'await Schema.parseAsymc(req.body)' is the line where you use 'Zod' to validate the request body data against the defined schema
// '.parseAsync(data:unknown): Promise<T>

//double fat arrow
const validate = (schema) =>async (req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next()
    } catch (err) {
        /* const message = err.errors[0].message;
        console.log(message)
        res.status(400).json({message:message}) */
        const status = 422;
        const message = "Fill the input properly";
        const extra_Error = err.errors[0].message;
        const error = {
            status,
            message,
            extra_Error
        }
        console.log(error)
        next(error)
    }
}

module.exports = validate;