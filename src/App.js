import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import InputResource from './components/inputResource';
import ResultsPanel from './components/resultsPanel';
import SchemaSelect from './components/schemaSelector';
import ErrorWindow from './components/errorWindow';
import validator from './validator';
import schemasProvider from './schemas';
import scraper from './utils/webScraper';


const datasetExample = `\
_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 a <https://schema.org/DataCatalog>;
  <https://schema.org/citation> _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-EE5B34C74F5FACF491078A0662CE6A23 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-EE5B34C74F5FACF491078A0662CE6A23 a <https://schema.org/CreativeWork>;
  <https://schema.org/identifier> "http://www.ncbi.nlm.nih.gov/pubmed/23023984" .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-01A64248899D6BE78F5548D9771BCB7A, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-056CF69526E3566A5AC757E0BE8AFAE5,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-0C331D6B31004C062464B14ACFC04F7D, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1B01D9BB4C8B9A22195AA74BAEB3E538,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1B53CFFEA63024DAF7E1FC138AE819D3, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1C79DEA528CDA66329C1955787A48841,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1DE8A5997006D8AFBDF8DB6D590D31AF, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-21B4A99FB7EFFF7DF7A644F43F268715,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-24992EDA5934B51453F1AED344535E05, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2586FBC1E921B83D0189D939DDE225BC,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-270C3B7CA74E6858A6CBD8ABFD5588CF .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-270C3B7CA74E6858A6CBD8ABFD5588CF a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Artificial%20deletions%20from%20the%20Drosdel%20project";
  <https://schema.org/name> "Artificial deletions from the Drosdel project";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Artificial%20deletions%20from%20the%20Drosdel%20project> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-275FD9CCE4E8A2D2736EC1CE68CCE82D, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2A78CB509E824FB47002500990EF1842,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2AA7AE193FBB2B0F298DF1260A607510, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-3997BA0114AE135D8FB8BECBC2F43FCF,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-3E19E65538F6EDC5026E814042BDBD9C, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-483173CEEA2F231D97FFC0977C251352,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4ACCE2A4135A8BF8D018FE1D1F875C49, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4B3A32CC76A787FD38F0B5138E9BA747,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4CF12B76E225D27DDC458A87CF1D105A .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4CF12B76E225D27DDC458A87CF1D105A a <https://schema.org/Dataset>;
  <https://schema.org/description> "The GeneChip® Drosophila Genome Array is a microarray tool for studying expression of Drosophila melanogaster transcripts.";
  <https://schema.org/identifier> "http://www.affymetrix.com/products/arrays/specific/fly_2.affx";
  <https://schema.org/name> "Affymetrix array: GeneChip Drosophila Genome Array";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Affymetrix%20array:%20GeneChip%20Drosophila%20Genome%20Array> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4F6DE9BDE1276457B8230A3A78969FDB, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-50CB2F9BAE0D60CADCBC7D69C1F2CD58 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-50CB2F9BAE0D60CADCBC7D69C1F2CD58 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Transcription profiling of Drosophila developmental time course";
  <https://schema.org/identifier> "http://www.ebi.ac.uk/microarray-as/ae/browse.html?keywords=E-FLYC-6";
  <https://schema.org/name> "E-FLYC-6";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:E-FLYC-6> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5161528F64749AEED667606CB4F62D9E, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5A72C0B1D787A3CFB9E03C7A53932C5F .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5A72C0B1D787A3CFB9E03C7A53932C5F a <https://schema.org/Dataset>;
  <https://schema.org/description> "D. melanogaster alleles and phenotypes from the FlyBase database";
  <https://schema.org/identifier> "http://flybase.org/";
  <https://schema.org/name> "Alleles and phenotypes";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Alleles%20and%20phenotypes> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5A7F367404655AE9454D8D02CBDFD669, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5C5DF58DC47F96249541534744D9AD40,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5CEEA406D226FF536A939F0D6222CD45, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-6E13405E6BF58F128920B3A85BB14ECB,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7594B9742978F1F36858F49DCDAD6050, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-794AF50AA3DB4F4DBD899444E8786BD1 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-794AF50AA3DB4F4DBD899444E8786BD1 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Patterns of gene expression in Drosophila embryogenesis by RNA in situ";
  <https://schema.org/identifier> "http://www.fruitfly.org/cgi-bin/ex/insitu.pl";
  <https://schema.org/name> "BDGP in situ data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:BDGP%20in%20situ%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-79C6089790A3C1AF11A764BF4CDA125C, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7C43F2CAAAB2491BAE8FFCA9DCF30B3B .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7C43F2CAAAB2491BAE8FFCA9DCF30B3B a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Fly%20Anatomy";
  <https://schema.org/name> "Fly Anatomy";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Fly%20Anatomy> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7CCF14637C07BDF4FE3F06FCBC68C235, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7E4EAA387276896376E2CDBA7C71D26C,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8285E8A6372482A06E12912CF2118A3F, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8676D3BD0475BC987A06AA6C9AE7E950,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-86D66375F5440440B082F05CC7FB466C, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8946882A6159B63BD3F090AEE99C58DD,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8B3D32B9778077F4519E644FE458CBEB .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8B3D32B9778077F4519E644FE458CBEB a <https://schema.org/Dataset>;
  <https://schema.org/description> "Curated genetic and physical interaction data for Drosophila melanogaster and Saccharomyces cerevisiae";
  <https://schema.org/identifier> "http://www.thebiogrid.org/downloads.php";
  <https://schema.org/name> "BioGRID interaction data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:BioGRID%20interaction%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8C85BFB0F2DCC636D9026FD0A30E03D1 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8C85BFB0F2DCC636D9026FD0A30E03D1 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20persimilis";
  <https://schema.org/name> "FlyBase data set for Drosophila persimilis";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20persimilis> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8DB0A6D9C41552DEBD9F88D719148190, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8EAD9F946EC25149528B85B404E1874D,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-9187370169B873E6D0AC267F4374E565, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-91C6723F5BBE1C1CEEDBE1A80891D205 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-91C6723F5BBE1C1CEEDBE1A80891D205 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20melanogaster";
  <https://schema.org/name> "FlyBase data set for Drosophila melanogaster";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20melanogaster> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-AB2EA7BD4DB1159236659F01C9672735, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-AD10F3DB09ED92554B31DEF7B6A6969E .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-AD10F3DB09ED92554B31DEF7B6A6969E a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20pseudoobscura%20pseudoobscura";
  <https://schema.org/name> "FlyBase data set for Drosophila pseudoobscura pseudoobscura";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20pseudoobscura%20pseudoobscura> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-B691B09B7635FB571DFA6B516BBBDE19 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-B691B09B7635FB571DFA6B516BBBDE19 a <https://schema.org/Dataset>;
  <https://schema.org/description> "The GeneChip® Drosophila Genome Array is a microarray tool for studying expression of Drosophila melanogaster transcripts.";
  <https://schema.org/identifier> "http://www.affymetrix.com/products/arrays/specific/fly.affx";
  <https://schema.org/name> "Affymetrix array: GeneChip Drosophila Genome 2.0 Array";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Affymetrix%20array:%20GeneChip%20Drosophila%20Genome%202.0%20Array> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BB5CAF84A339BF856F96321202B96285 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BB5CAF84A339BF856F96321202B96285 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Orthologues and paralogues between the 12 Drosophila species";
  <https://schema.org/identifier> "http://flybase.org/";
  <https://schema.org/name> "Drosophila species orthologues and paralogues";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Drosophila%20species%20orthologues%20and%20paralogues> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BE4435A051AD685B5938D947B65A4971, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BFF9CF9D8FDC6615F1ABBA92E8D6AEDE .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BFF9CF9D8FDC6615F1ABBA92E8D6AEDE a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20mojavensis";
  <https://schema.org/name> "FlyBase data set for Drosophila mojavensis";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20mojavensis> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C042DBDA2D0401DF21EA1D7A7557317B, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C4C922A2DEFAE1B6EDA8A0017F24DFB2,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C4D18A8F34564180B067EAFAAE124A9E, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C611A9E3D9E328253CF98B6F392AB0A5,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-D5268DF5895CDEFB70D7F10DFA6B278B .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-D5268DF5895CDEFB70D7F10DFA6B278B a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "http://www.fruitfly.org/DGC/index.html";
  <https://schema.org/name> "BDGP cDNA clone data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:BDGP%20cDNA%20clone%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DB8DA31535C8071B23801F33A298FB0F, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DBC10636FE0281FAD40EBAFAD0F0B8AA .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DBC10636FE0281FAD40EBAFAD0F0B8AA a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20ananassae";
  <https://schema.org/name> "FlyBase data set for Drosophila ananassae";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20ananassae> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DC5BA7E5F514B957F0D41211751700FF .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DC5BA7E5F514B957F0D41211751700FF a <https://schema.org/Dataset>;
  <https://schema.org/description> "Artificial deletions from the Drosdel project";
  <https://schema.org/identifier> "http://www.drosdel.org.uk/";
  <https://schema.org/name> "Artificial deletions";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Artificial%20deletions> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DE96BA285AA6DB4C092F255ACA265E39, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E3B7EB4ED3E3292041D0BBC3CDD9E033 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E3B7EB4ED3E3292041D0BBC3CDD9E033 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20virilis";
  <https://schema.org/name> "FlyBase data set for Drosophila virilis";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20virilis> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E45CFC68ED26B2ABB21C151F6549F107 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E45CFC68ED26B2ABB21C151F6549F107 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Fly%20Miscellaneous%20CV%20Terms";
  <https://schema.org/name> "Fly Miscellaneous CV Terms";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Fly%20Miscellaneous%20CV%20Terms> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E60F559D767FC9FB317F07CE7B2EF0A5, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E74589F4ADBC55FE201748AF906C6CE9,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E82EDC528A2C7F462AE10C9009898B80, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F1AB49B7E65AE781304E5E7747C17400 .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F1AB49B7E65AE781304E5E7747C17400 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Fly%20Development";
  <https://schema.org/name> "Fly Development";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Fly%20Development> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/dataset>
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F67899DF22DD1F3DDDEA51C23BA7B9FF, _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F9E7E8161C54F3C6D12D5BBC4D798AC6,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-FC15B49FBD3AEED9EF727A4E56A83A3E .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-FC15B49FBD3AEED9EF727A4E56A83A3E a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20melanogaster";
  <https://schema.org/name> "FlyBase fasta data set for Drosophila melanogaster";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20melanogaster> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1E711BBBA4ED246285311DAF9EDD4137 <https://schema.org/description>
    "An integrated database for <i>Drosophila</i> genomics";
  <https://schema.org/identifier> "https://registry.intermine.org/flymine";
  <https://schema.org/keywords> "Data warehouse, Data integration,Bioinformatics software";
  <https://schema.org/name> "FlyMine";
  <https://schema.org/provider> _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-32FEE9AD9C8A8AD225E62728CA53AA9F,
    _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5634BDE4B6C88D453F218E325DEA3318;
  <https://schema.org/sourceOrganization> _:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-FF7F205A925C00E160C4FC360B1A76D7;
  <https://schema.org/url> <https://www.flymine.org/flymine> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1B53CFFEA63024DAF7E1FC138AE819D3 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Disease%20Ontology";
  <https://schema.org/name> "Disease Ontology";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Disease%20Ontology> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2A78CB509E824FB47002500990EF1842 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Affymetrix microarray-based atlas of gene expression in larval and adult D. melanogaster tissues";
  <https://schema.org/identifier> "http://www.flyatlas.org/";
  <https://schema.org/name> "FlyAtlas";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyAtlas> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4ACCE2A4135A8BF8D018FE1D1F875C49 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20erecta";
  <https://schema.org/name> "FlyBase data set for Drosophila erecta";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20erecta> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-483173CEEA2F231D97FFC0977C251352 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20grimshawi";
  <https://schema.org/name> "FlyBase data set for Drosophila grimshawi";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20grimshawi> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-3997BA0114AE135D8FB8BECBC2F43FCF a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20sechellia";
  <https://schema.org/name> "FlyBase data set for Drosophila sechellia";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20sechellia> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5CEEA406D226FF536A939F0D6222CD45 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20simulans";
  <https://schema.org/name> "FlyBase data set for Drosophila simulans";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20simulans> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-79C6089790A3C1AF11A764BF4CDA125C a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20willistoni";
  <https://schema.org/name> "FlyBase data set for Drosophila willistoni";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20willistoni> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-0C331D6B31004C062464B14ACFC04F7D a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20yakuba";
  <https://schema.org/name> "FlyBase data set for Drosophila yakuba";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20data%20set%20for%20Drosophila%20yakuba> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8946882A6159B63BD3F090AEE99C58DD a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20ananassae";
  <https://schema.org/name> "FlyBase fasta data set for Drosophila ananassae";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20ananassae> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8DB0A6D9C41552DEBD9F88D719148190 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20pseudoobscura%20pseudoobscura";
  <https://schema.org/name> "FlyBase fasta data set for Drosophila pseudoobscura pseudoobscura";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20pseudoobscura%20pseudoobscura> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-01A64248899D6BE78F5548D9771BCB7A a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20simulans";
  <https://schema.org/name> "FlyBase fasta data set for Drosophila simulans";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20simulans> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-AB2EA7BD4DB1159236659F01C9672735 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20virilis";
  <https://schema.org/name> "FlyBase fasta data set for Drosophila virilis";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyBase%20fasta%20data%20set%20for%20Drosophila%20virilis> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1B01D9BB4C8B9A22195AA74BAEB3E538 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Intergenic regions created by FlyMine";
  <https://schema.org/identifier> "http://www.flymine.org";
  <https://schema.org/name> "FlyMine intergenic regions";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyMine%20intergenic%20regions> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C4D18A8F34564180B067EAFAAE124A9E a <https://schema.org/Dataset>;
  <https://schema.org/description> "Curated Reactome pathway data";
  <https://schema.org/identifier> "http://fly.reactome.org";
  <https://schema.org/name> "FlyReactome data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyReactome%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5C5DF58DC47F96249541534744D9AD40 a <https://schema.org/Dataset>;
  <https://schema.org/description> "A non-redundant set of high quality curated binding site information for transcription factors and target genes and empirically validated cis-regulatory modules and their constituent binding sites ";
  <https://schema.org/identifier> "http://www.flyreg.org";
  <https://schema.org/name> "FlyReg data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:FlyReg%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8285E8A6372482A06E12912CF2118A3F a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:GO";
  <https://schema.org/name> "GO";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:GO> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-275FD9CCE4E8A2D2736EC1CE68CCE82D a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:GO%20Annotation%20data%20set";
  <https://schema.org/name> "GO Annotation data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:GO%20Annotation%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-24992EDA5934B51453F1AED344535E05 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Curated gene ontology annotations from FlyBase ";
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:GO%20Annotation%20for%20Drosophila%20melanogaster";
  <https://schema.org/name> "GO Annotation for Drosophila melanogaster";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:GO%20Annotation%20for%20Drosophila%20melanogaster> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-BE4435A051AD685B5938D947B65A4971 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:HGNC%20identifiers";
  <https://schema.org/name> "HGNC identifiers";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:HGNC%20identifiers> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C4C922A2DEFAE1B6EDA8A0017F24DFB2 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:HomoloGene%20data%20set";
  <https://schema.org/name> "HomoloGene data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:HomoloGene%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C611A9E3D9E328253CF98B6F392AB0A5 a <https://schema.org/Dataset>;
  <https://schema.org/description> "International Drosophila Array Consortium long oligo data set";
  <https://schema.org/identifier> "http://www.indac.net/";
  <https://schema.org/name> "INDAC long oligo data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:INDAC%20long%20oligo%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-86D66375F5440440B082F05CC7FB466C a <https://schema.org/Dataset>;
  <https://schema.org/description> "Molecular interactions for Drosohila melanogaster";
  <https://schema.org/identifier> "https://www.ebi.ac.uk/intact/";
  <https://schema.org/name> "IntAct molecular interactions";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:IntAct%20molecular%20interactions> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-3E19E65538F6EDC5026E814042BDBD9C a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:InterPro%20GO%20Annotation%20data%20set";
  <https://schema.org/name> "InterPro GO Annotation data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:InterPro%20GO%20Annotation%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1DE8A5997006D8AFBDF8DB6D590D31AF a <https://schema.org/Dataset>;
  <https://schema.org/description> "Protein family and domain assignments to D. melanogaster proteins";
  <https://schema.org/identifier> "https://www.ebi.ac.uk/interpro/";
  <https://schema.org/name> "InterPro data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:InterPro%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8EAD9F946EC25149528B85B404E1874D a <https://schema.org/Dataset>;
  <https://schema.org/description> "Curated GO annotations for InterPro protein domains";
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:InterPro%20domains%20to%20GO%20annotations";
  <https://schema.org/name> "InterPro domains to GO annotations";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:InterPro%20domains%20to%20GO%20annotations> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E60F559D767FC9FB317F07CE7B2EF0A5 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Manually drawn pathway maps representing our knowledge on the molecular interaction and reaction networks for Drosophila";
  <https://schema.org/identifier> "http://www.genome.jp/kegg/pathway.html";
  <https://schema.org/name> "KEGG pathways data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:KEGG%20pathways%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E74589F4ADBC55FE201748AF906C6CE9 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:MGI%20identifiers";
  <https://schema.org/name> "MGI identifiers";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:MGI%20identifiers> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5A7F367404655AE9454D8D02CBDFD669 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:NCBI%20Entrez%20Gene%20identifiers";
  <https://schema.org/name> "NCBI Entrez Gene identifiers";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:NCBI%20Entrez%20Gene%20identifiers> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-E82EDC528A2C7F462AE10C9009898B80 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Human disease data from OMIM";
  <https://schema.org/identifier> "https://www.omim.org/";
  <https://schema.org/name> "OMIM data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:OMIM%20data%20set> .

<https://www.flymine.org/flymine/begin.do> <http://vocab.sindice.net/any23#Content-Type>
    "text/html; charset=iso-8859-1";
  <http://vocab.sindice.net/any23#description> "Integrated queryable database for Drosophila genomics";
  <http://purl.org/dc/terms/title> "FlyMine: Home";
  <http://vocab.sindice.net/any23#google-site-verification> "PY_zUrvlGjH4BjisaAAOPfedadhq1AfXthyJdbBu1nU";
  <http://vocab.sindice.net/any23#keywords> "microarray, bioinformatics, drosophila, genomics";
  <http://vocab.sindice.net/any23#msvalidate.01> "5FB24B81F9161EA9B8339069C05BC763";
  <http://vocab.sindice.net/any23#y_key> "";
  <http://www.w3.org/1999/xhtml/vocab#alternate> <https://intermineorg.wordpress.com/feed>;
  <http://www.w3.org/1999/xhtml/vocab#stylesheet> <https://cdn.intermine.org/css/font-awesome/4.x/css/font-awesome.min.css>,
    <https://www.flymine.org/flymine/css/begin.css>;
  <http://www.w3.org/1999/xhtml/vocab#icon> <https://www.flymine.org/flymine/model/images/favicon.ico>;
  <http://www.w3.org/1999/xhtml/vocab#stylesheet> <https://www.flymine.org/flymine/css/errorMessages.css>,
    <https://www.flymine.org/flymine/css/contactForm.css>, <https://www.flymine.org/flymine/css/inlineTagEditor.css>,
    <https://www.flymine.org/flymine/css/resultstables.css>, <https://www.flymine.org/flymine/css/webapp.css>,
    <https://www.flymine.org/flymine/themes/purple/theme.css> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-C042DBDA2D0401DF21EA1D7A7557317B a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:OMIM%20diseases";
  <https://schema.org/name> "OMIM diseases";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:OMIM%20diseases> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-1C79DEA528CDA66329C1955787A48841 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Orthologue and Paralogue predictions between D. melanogaster,D. rerio, C. elegans, M. musculus, R. norvegicus, H. sapiens, S. cerevisiae";
  <https://schema.org/identifier> "http://pantherdb.org/";
  <https://schema.org/name> "Orthologue and paralogue predictions";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Orthologue%20and%20paralogue%20predictions> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7594B9742978F1F36858F49DCDAD6050 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:PSI%20Molecular%20Interactions";
  <https://schema.org/name> "PSI Molecular Interactions";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:PSI%20Molecular%20Interactions> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4B3A32CC76A787FD38F0B5138E9BA747 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Mappings of genes found in pubmed abstracts to genes";
  <https://schema.org/identifier> "ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/";
  <https://schema.org/name> "PubMed to gene mapping";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:PubMed%20to%20gene%20mapping> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7E4EAA387276896376E2CDBA7C71D26C a <https://schema.org/Dataset>;
  <https://schema.org/description> "Regulatory element database for Drosophila";
  <https://schema.org/identifier> "http://redfly.ccr.buffalo.edu/?content=/search.php";
  <https://schema.org/name> "REDfly Drosophila transcription factor binding sites";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:REDfly%20Drosophila%20transcription%20factor%20binding%20sites> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F67899DF22DD1F3DDDEA51C23BA7B9FF a <https://schema.org/Dataset>;
  <https://schema.org/description> "Regulatory element database for Drosophila";
  <https://schema.org/identifier> "http://redfly.ccr.buffalo.edu/?content=/search.php";
  <https://schema.org/name> "REDfly Drosophila transcriptional cis-regulatory modules";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:REDfly%20Drosophila%20transcriptional%20cis-regulatory%20modules> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DB8DA31535C8071B23801F33A298FB0F a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:RGD%20gene%20identifiers";
  <https://schema.org/name> "RGD gene identifiers";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:RGD%20gene%20identifiers> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2AA7AE193FBB2B0F298DF1260A607510 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Phenotypes from RNA interference (RNAi) screens in D. melanogaster";
  <https://schema.org/identifier> "http://www.genomernai.org/";
  <https://schema.org/name> "RNAi screen phenotypes";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:RNAi%20screen%20phenotypes> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-056CF69526E3566A5AC757E0BE8AFAE5 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Reactome%20pathways%20data%20set";
  <https://schema.org/name> "Reactome pathways data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Reactome%20pathways%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-8676D3BD0475BC987A06AA6C9AE7E950 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:Sequence%20Ontology";
  <https://schema.org/name> "Sequence Ontology";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Sequence%20Ontology> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-9187370169B873E6D0AC267F4374E565 a <https://schema.org/Dataset>;
  <https://schema.org/description> "high-quality, manually annotated, non-redundant protein sequence database";
  <https://schema.org/identifier> "http://www.uniprot.org/";
  <https://schema.org/name> "Swiss-Prot data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:Swiss-Prot%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-21B4A99FB7EFFF7DF7A644F43F268715 a <https://schema.org/Dataset>;
  <https://schema.org/description> "The developmental transcriptome of Drosophila melanogaster. RNA-seq data from the modENCODE project";
  <https://schema.org/identifier> "http://flybase.org/";
  <https://schema.org/name> "The developmental transcriptome of Drosophila melanogaster.";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:The%20developmental%20transcriptome%20of%20Drosophila%20melanogaster.> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-2586FBC1E921B83D0189D939DDE225BC a <https://schema.org/Dataset>;
  <https://schema.org/description> "Computationally analysed records, enriched with automatic annotation";
  <https://schema.org/identifier> "http://www.uniprot.org/";
  <https://schema.org/name> "TrEMBL data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:TrEMBL%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-4F6DE9BDE1276457B8230A3A78969FDB a <https://schema.org/Dataset>;
  <https://schema.org/description> "Orthology/parology predictions for D. melanogaster, D. rerio, C. elegans, M. musculus, R. norvegicus, H. sapiens and S. cerevisiae ";
  <https://schema.org/identifier> "http://www.treefam.org/cgi-bin/misc_page.pl?download";
  <https://schema.org/name> "TreeFam data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:TreeFam%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-6E13405E6BF58F128920B3A85BB14ECB a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:UniProt%20data%20set";
  <https://schema.org/name> "UniProt data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:UniProt%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-DE96BA285AA6DB4C092F255ACA265E39 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:UniProt%20keywords%20data%20set";
  <https://schema.org/name> "UniProt keywords data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:UniProt%20keywords%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-7CCF14637C07BDF4FE3F06FCBC68C235 a <https://schema.org/Dataset>;
  <https://schema.org/identifier> "https://www.flymine.org/flymine/dataset:WormBase%20genes";
  <https://schema.org/name> "WormBase genes";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:WormBase%20genes> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5161528F64749AEED667606CB4F62D9E a <https://schema.org/Dataset>;
  <https://schema.org/description> "fly-Fish data set of Drosophila embryo mRNA localization patterns";
  <https://schema.org/identifier> "http://fly-fish.ccbr.utoronto.ca";
  <https://schema.org/name> "fly-Fish data set";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:fly-Fish%20data%20set> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-F9E7E8161C54F3C6D12D5BBC4D798AC6 a <https://schema.org/Dataset>;
  <https://schema.org/description> "Identification of potential microRNA targets by using the miRanda software (Computational Biology Center of Memorial Sloan-Kettering Cancer Center)";
  <https://schema.org/identifier> "http://www.mirbase.org/";
  <https://schema.org/name> "miRBase Targets";
  <https://schema.org/url> <https://www.flymine.org/flymine/dataset:miRBase%20Targets> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-5634BDE4B6C88D453F218E325DEA3318 a <https://schema.org/Person>;
  <https://schema.org/email> "support@intermine.org";
  <https://schema.org/name> "InterMine support" .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-32FEE9AD9C8A8AD225E62728CA53AA9F a <https://schema.org/Organization>;
  <https://schema.org/name> "InterMine";
  <https://schema.org/url> <http://intermine.org> .

_:genid-3ca54fdf6c83453b9d0ffd2851c8b1ad-FF7F205A925C00E160C4FC360B1A76D7 a <https://schema.org/Organization>;
  <https://schema.org/name> "University of Cambridge";
  <https://schema.org/url> <https://www.gen.cam.ac.uk> .
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaKey: null,
      validationResult: null,
      validationError: null,
      inputMode: 'code',
      rawCode: datasetExample,
      inputUrl: 'https://www.flymine.org/flymine/begin.do',
    };
  }

  inputModeChange = (inputMode) => {
    this.setState({ inputMode });
  };

  codeChange = (code) => {
    this.setState({ rawCode: code });
  };

  inputUrlChange = (newUrl) => {
    this.setState({ inputUrl: newUrl });
  };

  schemaSelection = (schemaKey) => {
    this.setState({ schemaKey });
  };

  runValidation = async () => {
    const {
      schemaKey, rawCode, inputUrl, inputMode,
    } = this.state;
    let profile;
    let validationResult = null;
    try {
      profile = (await schemasProvider()).find((schema) => schema.name === schemaKey);
      console.log('Validating with schema:', schemaKey);
      const codeRDF = (inputMode === 'code')
        ? rawCode
        : (await scraper(inputUrl));
      validationResult = await validator(profile.content, codeRDF);
      console.log('Validation done:', validationResult);
    } catch (err) {
      console.error(err);
      alert('Problem with parsing the Bioschemas profile.');
      // TODO: change to modal error window
      // this.setState({validationError: error})
    }
    this.setState({ validationResult });
  };

  render() {
    const {
      schemaKey, rawCode, validationResult, validationError, inputUrl, inputMode,
    } = this.state;
    const validateBtnDisabled = (schemaKey === null) || !rawCode;
    const validateBtn = (<Button onClick={this.runValidation} disabled={validateBtnDisabled} size="lg">Validate</Button>);

    return (
      <Container>
        <ErrorWindow show={!!validationError} message={validationError} />
        <h1>Validata 2 Validator tool</h1>
        <Row>
          <Col xs="12">
            <InputResource
              inputMode={inputMode}
              onInputModeChange={this.inputModeChange}
              rawCode={rawCode}
              onCodeChange={this.codeChange}
              inputUrl={inputUrl}
              onInputUrlChange={this.inputUrlChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="5">
            <SchemaSelect onChange={this.schemaSelection} validateButton={validateBtn} />
          </Col>
          <Col><ResultsPanel validationResult={validationResult} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
