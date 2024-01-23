const express = require('express');
var config = require('./dbconfig');
const sql = require('mssql');
const { request, response } = require('express');
const app = express();



async function getAllDepo() {
    try {
        let pool = await sql.connect(config);
        let getStok = await pool.request().query("select dep_no,dep_adi from Depolar where 1=1 and dep_envanter_harici_fl=0 ");
            const data={data:getStok.recordset}
            return data;      
    }
    catch (error) {
        console.log(error);
    }
}

//sube_no ye göre getirme 
async function getDepoSubeNo(sube_no) {
    try {
        let pool = await sql.connect(config);
        let getSubeAdi = await pool.request()
            .input('input_parameter', sql.Int, sube_no)
            .query("SELECT distinct dep_subeno,dep_adi,dep_no from Depolar where dep_subeno=@input_parameter order by dep_adi");
            
        return getSubeAdi.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getStoklar(stokAdi,stokKodu) {
    try {
        let pool = await sql.connect(config);
        let tümStokGetir = await pool.request()
        .input('input_parameters', sql.NVarChar, stokAdi,stokKodu)
        .query("SELECT sto_kod,sto_isim, sto_max_stok, sto_birim1_ad,sto_anagrup_kod, sto_doviz_cinsi,sto_altgrup_kod, sto_marka_kodu, sto_reyon_kodu FROM STOKLAR where concat(sto_isim,sto_kod) like '%' + @input_parameters + '%'     " );
            const data={data:tümStokGetir.recordset}
            return data;      
    }
    catch (error) {
        console.log(error);
    }
}


async function getDepolarArasiSiparisler() {
    try{
        let pool=await sql.connect(config);
        let getDepolarFisi=await pool.request().query('SELECT * FROM DEPOLAR_ARASI_SIPARISLER');
        const data={data:getDepolarFisi.recordsets}
        return data;

    }catch(e){

    }
    
}






module.exports = {
    getAllDepo:getAllDepo,
    getDepoSubeNo:getDepoSubeNo,
    getDepolarArasiSiparisler:getDepolarArasiSiparisler,
    getStoklar:getStoklar
 }