import { mydb } from "../../mymodules/prismaClientInstance";


export default async(req, res) => {
    const data = req.body;
    try{
        let result = "";
        
        result = await mydb.paper.updateMany({
            where: {
                id: data.paperID
            },
            data: {
                status: "Accepted"
            }
        })

        
        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}