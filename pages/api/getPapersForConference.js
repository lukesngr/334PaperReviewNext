import { mydb } from "../../mymodules/prismaClientInstance";

export default async(req, res) => {
    let data = req.query;
    try {
        const papers = await mydb.paper.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                authorEmail: true,
                status: true,
            }
        });

        res.status(200).json(papers);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}