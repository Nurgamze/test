const dboperations=require("./dboperations")
var express=require ("express");
var bodyParser=require ("body-parser");
var cors=require ("cors");
var app =express();
var router=express.Router();

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);


const apiKey = (request, response, next) => {
    console.log("middleware");
    const key = request.headers['apikey'];

    if (key !== 'l75pq03ejewq1qdkap1e19u9jwdk2qdm5dAsd321CnsfWWlosmCs123y') {
        response.status(403).json({ error: 'Geçersiz API anahtarı' });
        return;
    }
    next();
};


router.route('/stoklar/:stokAdi').get(apiKey,(request,response)=>
{
    console.log(request.body);
    console.log(request.params.stokAdi);
    dboperations.getStoklar(request.params.stokAdi,request.params.stokKodu).then(result=>
    {   
        response.json(result);
    });
});



//
router.route('/depolar').get( apiKey, (request, response) => {
    console.log(request.body);
    dboperations.getAllDepo(response).then(result => {
        response.json(result);
    });
});

// /depo/:subeno 
router.route('/depo/:subeno').get( apiKey, (request, response) => {
    console.log(request.body);
    dboperations.getDepoSubeNo(request.params.subeno).then(result => {
        response.json(result);
    });
});
// /depo/:subeno 
router.route('/depo/:ghj').get( apiKey, (request, response) => {
    console.log(request.body);
    dboperations.getDepoSubeNo(request.params.subeno).then(result => {
        response.json(result);
    });
});





router.route('/depolararasisiparisfisi').get(apiKey ,(request,response)=>{
    console.log(request.body);
    dboperations.getDepolarArasiSiparisler(response).then(result=>{
        response.json(result);
    });
})









var port =process.env.PORT || 3000; //localhosta bağlanma portu 
app.listen(port);
console.log("lojistik api çalisiyor " + port);



