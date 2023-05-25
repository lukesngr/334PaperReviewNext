import { mydb } from "../../mymodules/prismaClientInstance";


export default async(req, res) => {
    const data = req.body;
    try{
        let result = "";
        
        result = await mydb.user.updateMany({
            where: {
                email: data.authorEmail
            },
            data: {
                preferredNumberOfPapers: data.preferredNumber
            }
        })
        
        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}