const files = [];
const context = require.context('./', true, /\.json$/);
context.keys().forEach((key) => {
  files.push(context(key));
});

// files.push({
//   title: 'Tool (v0.1)',
//   description: 'The Life Science Tools specification provides a way to describe bioscience tools and software on the World Wide Web. It defines a set of metadata and vocabularies, built on top of existing technologies and standards, that can be used to represent such tools in Web pages and applications. The goal of the specification is to make it easier to discover, exchange and integrate information about life science tools across the Internet.',
//   type: 'object',
//   definitions: {
//     Boolean: {
//       type: 'boolean',
//     },
//     Date: {
//       type: 'string',
//     },
//     DateTime: {
//       type: 'string',
//     },
//     Integer: {
//       type: 'integer',
//     },
//     Number: {
//       type: 'number',
//     },
//     Text: {
//       type: 'string',
//       format: 'text',
//     },
//     URL: {
//       type: 'string',
//       format: 'url',
//     },
//     String: {
//       type: 'string',
//     },
//     CreativeWork: {
//       title: 'CreativeWork',
//       description: 'The most generic kind of creative work, including books, movies, photographs, software programs, etc.',
//       properties: {
//         '@type': {
//           default: 'CreativeWork',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//     Offer: {
//       title: 'Offer',
//       description: 'An offer to transfer some rights to an item or to provide a service \u2014 for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book.<br/><br/>\n\nFor <a href="http://www.gs1.org/barcodes/technical/idkeys/gtin">GTIN</a>-related fields, see <a href="http://www.gs1.org/barcodes/support/check_digit_calculator">Check Digit calculator</a> and <a href="http://www.gs1us.org/resources/standards/gtin-validation-guide">validation guide</a> from <a href="http://www.gs1.org/">GS1</a>.',
//       properties: {
//         '@type': {
//           default: 'Offer',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//     Organization: {
//       title: 'Organization',
//       description: 'An organization such as a school, NGO, corporation, club, etc.',
//       properties: {
//         '@type': {
//           default: 'Organization',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//     Person: {
//       title: 'Person',
//       description: 'A person (alive, dead, undead, or fictional).',
//       properties: {
//         '@type': {
//           default: 'Person',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//   },
//   properties: {
//     '@context': {
//       default: 'http://schema.org',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     '@type': {
//       default: 'Tool',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     'dct:conformsTo': {
//       default: 'https://bioschemas.org/specifications/Tool/0.1',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     applicationCategory: {
//       title: 'applicationCategory (Optional)',
//       propertyOrder: 3,
//       description: "Bioschemas: Type of software e.g. database, tool, service.\n**Note:** Bioschemas have removed [URL](http://schema.org/URL) from the Expected Types. Schema.org: Type of software application, e.g. 'Game, Multimedia'. ",
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//         ],
//       },
//     },
//     citation: {
//       title: 'citation (Recommended)',
//       propertyOrder: 2,
//       description: 'Bioschemas: Publication about this software. Schema.org: A citation or reference to another creative work, such as another publication, web page, scholarly article, etc. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//           {
//             title: 'CreativeWork',
//             $ref: '#/definitions/CreativeWork',
//           },
//         ],
//       },
//     },
//     dateCreated: {
//       title: 'dateCreated (Optional)',
//       propertyOrder: 3,
//       description: 'Schema.org: The date on which the CreativeWork was created or the item was added to a DataFeed. ',
//       oneOf: [
//         {
//           title: 'Date',
//           $ref: '#/definitions/Date',
//         },
//         {
//           title: 'DateTime',
//           $ref: '#/definitions/DateTime',
//         },
//       ],
//     },
//     dateModified: {
//       title: 'dateModified (Optional)',
//       propertyOrder: 3,
//       description: "Schema.org: The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. ",
//       oneOf: [
//         {
//           title: 'Date',
//           $ref: '#/definitions/Date',
//         },
//         {
//           title: 'DateTime',
//           $ref: '#/definitions/DateTime',
//         },
//       ],
//     },
//     description: {
//       title: 'description (Minimum)',
//       propertyOrder: 1,
//       description: 'Bioschemas: A short description of the item. Schema.org: A description of the item. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     featureList: {
//       title: 'featureList (Minimum)',
//       propertyOrder: 1,
//       description: 'Bioschemas: Please choose values from [EDAM:Operation](http://edamontology.org/operation_0004). Schema.org: Features or modules provided by this application (and possibly required by other applications). ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     hasPart: {
//       title: 'hasPart (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Used to describe tools included into suites/bundles/workflows.\n**Note:** Bioschemas have changed the Expected Type from [CreativeWork](http://schema.org/CreativeWork) to [SoftwareApplication](http://schema.org/SoftwareApplication). Schema.org: Indicates a CreativeWork that is (in some sense) a part of this CreativeWork.\nInverse property: isPartOf. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'CreativeWork',
//             $ref: '#/definitions/CreativeWork',
//           },
//         ],
//       },
//     },
//     keywords: {
//       title: 'keywords (Optional)',
//       propertyOrder: 3,
//       description: 'Schema.org: Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     license: {
//       title: 'license (Recommended)',
//       propertyOrder: 2,
//       description: 'Bioschemas: The applicable software license.\n**Note:** Bioschemas have changed the Expected Types from [CreativeWork](http://schema.org/CreativeWork) and [URL](http://schema.org/URL) to [Text](http://schema.org/Text). Schema.org: A license document that applies to this content, typically indicated by URL. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//         ],
//       },
//     },
//     name: {
//       title: 'name (Minimum)',
//       propertyOrder: 1,
//       description: 'Schema.org: The name of the item. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     offers: {
//       title: 'offers (Optional)',
//       propertyOrder: 3,
//       description: 'Schema.org: An offer to provide this item\u2014for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Offer',
//             $ref: '#/definitions/Offer',
//           },
//         ],
//       },
//     },
//     operatingSystem: {
//       title: 'operatingSystem (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Operating systems on which the app runs. Schema.org: Operating systems supported (Windows 7, OSX 10.6, Android 1.6). ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//         ],
//       },
//     },
//     potentialAction: {
//       title: 'potentialAction (Optional)',
//       propertyOrder: 3,
//       description: "Bioschemas: The input format of the data. Must be one of the [EDAM:Data](http://edamontology.org/data_0006) concept labels or one of its synonyms.\n**Note:** Bioschemas have changed the Expected Type from [Action](http://schema.org/Action) to [URL](http://schema.org/URL). Schema.org: Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role. ",
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     publisher: {
//       title: 'publisher (Recommended)',
//       propertyOrder: 2,
//       description: 'Schema.org: The publisher of the creative work. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Organization',
//             $ref: '#/definitions/Organization',
//           },
//           {
//             title: 'Person',
//             $ref: '#/definitions/Person',
//           },
//         ],
//       },
//     },
//     softwareHelp: {
//       title: 'softwareHelp (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: A documentation for the tool. Schema.org: Software application help. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'CreativeWork',
//             $ref: '#/definitions/CreativeWork',
//           },
//         ],
//       },
//     },
//     softwareRequirements: {
//       title: 'softwareRequirements (Optional)',
//       propertyOrder: 3,
//       description: 'Schema.org: Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime). Supersedes requirements. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     softwareVersion: {
//       title: 'softwareVersion (Minimum)',
//       propertyOrder: 1,
//       description: 'Schema.org: Version of the software instance. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     url: {
//       title: 'url (Minimum)',
//       propertyOrder: 1,
//       description: "Bioschemas: URL of the item. This property can be used on a page listing many software tools, to indicate each individual tool's page. Schema.org: URL of the item. ",
//       oneOf: [
//         {
//           title: 'URL',
//           $ref: '#/definitions/URL',
//         },
//       ],
//     },
//   },
//   required: [
//     '@type',
//     '@context',
//     'dct:conformsTo',
//     'description',
//     'featureList',
//     'name',
//     'softwareVersion',
//     'url',
//   ],
// });

// files.push({
//   title: 'Taxon (v0.3)',
//   description: 'This profile aims to denote a taxon by common properties such as its scientific name, authority, taxonomic rank and vernacular names. It is also a means to link to existing taxonomic registers where each taxon has a URI.',
//   type: 'object',
//   definitions: {
//     Boolean: {
//       type: 'boolean',
//     },
//     Date: {
//       type: 'string',
//     },
//     DateTime: {
//       type: 'string',
//     },
//     Integer: {
//       type: 'integer',
//     },
//     Number: {
//       type: 'number',
//     },
//     Text: {
//       type: 'string',
//       format: 'text',
//     },
//     URL: {
//       type: 'string',
//       format: 'url',
//     },
//     String: {
//       type: 'string',
//     },
//     Taxon: {
//       title: 'Taxon (v0.3) Minimum Version',
//       description: 'This profile aims to denote a taxon by common properties such as its scientific name, authority, taxonomic rank and vernacular names. It is also a means to link to existing taxonomic registers where each taxon has a URI.',
//       type: 'object',
//       properties: {
//         '@context': {
//           default: 'http://schema.org',
//           options: {
//             hidden: 'true',
//           },
//           type: 'string',
//         },
//         '@type': {
//           default: 'Taxon',
//           options: {
//             hidden: 'true',
//           },
//           type: 'string',
//         },
//         'dct:conformsTo': {
//           default: 'https://bioschemas.org/specifications/Taxon/0.3',
//           options: {
//             hidden: 'true',
//           },
//           type: 'string',
//         },
//         name: {
//           title: 'name (Minimum)',
//           propertyOrder: 1,
//           description: 'Bioschemas: Taxon name without authorship nor date information of the currently valid (zoological) or accepted (botanical) taxon. Schema.org: The name of the item. ',
//           oneOf: [
//             {
//               title: 'Text',
//               $ref: '#/definitions/Text',
//             },
//           ],
//         },
//       },
//       required: [
//         '@type',
//         '@context',
//         'dct:conformsTo',
//         'name',
//       ],
//     },
//     CategoryCode: {
//       title: 'CategoryCode',
//       description: 'A Category Code.',
//       properties: {
//         '@type': {
//           default: 'CategoryCode',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//     PropertyValue: {
//       title: 'PropertyValue',
//       description: "A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.<br/><br/>\n\nAlways use specific schema.org properties when a) they exist and b) you can populate them. Using PropertyValue as a substitute will typically not trigger the same effect as using the original, specific property.",
//       properties: {
//         '@type': {
//           default: 'PropertyValue',
//           type: 'string',
//           options: {
//             hidden: 'true',
//           },
//         },
//         '@id': {
//           title: 'Link to other resource',
//           description: 'Placeholder Description',
//           $ref: '#/definitions/URL',
//         },
//       },
//       required: [
//         '@id',
//         '@type',
//       ],
//     },
//   },
//   properties: {
//     '@context': {
//       default: 'http://schema.org',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     '@type': {
//       default: 'Taxon',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     'dct:conformsTo': {
//       default: 'https://bioschemas.org/specifications/Taxon/0.3',
//       options: {
//         hidden: 'true',
//       },
//       type: 'string',
//     },
//     additionalType: {
//       title: 'additionalType (Optional)',
//       propertyOrder: 3,
//       description: "Bioschemas: A Taxon type from a well known vocabulary, e.g. DarwinCore http://rs.tdwg.org/dwc/terms/Taxon or http://rs.tdwg.org/ontology/voc/TaxonConcept#TaxonConcept Schema.org: An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. In RDFa syntax, it is better to use the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org tools may have only weaker understanding of extra types, in particular those defined externally. ",
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     alternateName: {
//       title: 'alternateName (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Scientific name, possibly including authorship and date information, of a synonym of the currently valid (zoological) or accepted (botanical) taxon. Schema.org: An alias for the item. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//         ],
//       },
//     },
//     childTaxon: {
//       title: 'childTaxon (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Direct, most proximate lower-rank child taxa Schema.org: Closest child taxa of the taxon in question.\nInverse property: parentTaxon ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//           {
//             title: 'Taxon',
//             $ref: '#/definitions/Taxon',
//           },
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     hasCategoryCode: {
//       title: 'hasCategoryCode (Optional)',
//       propertyOrder: 3,
//       description: 'Schema.org: A Category code contained in this code set. ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'CategoryCode',
//             $ref: '#/definitions/CategoryCode',
//           },
//         ],
//       },
//     },
//     name: {
//       title: 'name (Minimum)',
//       propertyOrder: 1,
//       description: 'Bioschemas: Taxon name without authorship nor date information of the currently valid (zoological) or accepted (botanical) taxon. Schema.org: The name of the item. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     parentTaxon: {
//       title: 'parentTaxon (Recommended)',
//       propertyOrder: 2,
//       description: 'Bioschemas: Direct, most proximate higher-rank parent taxon Schema.org: Closest parent taxon of the taxon in question.\nInverse property: childTaxon ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//         {
//           title: 'Taxon',
//           $ref: '#/definitions/Taxon',
//         },
//         {
//           title: 'URL',
//           $ref: '#/definitions/URL',
//         },
//       ],
//     },
//     sameAs: {
//       title: 'sameAs (Optional)',
//       propertyOrder: 3,
//       description: "Bioschemas: URL of third-party webpages describing the same taxon Schema.org: URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. ",
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     scientificName: {
//       title: 'scientificName (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Full scientific name, with authorship and date information if know, of the currently valid (zoological) or accepted (botanical) taxon. ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     scientificNameAuthorship: {
//       title: 'scientificNameAuthorship (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: Authorship information for the scientificName formatted according to the conventions of the applicable nomenclatural Code. Example: "(Torr.) J.T. Howell", "(Martinovsk\u00fd) Tzvelev", "(Gy\u00f6rfi, 1952)" ',
//       oneOf: [
//         {
//           title: 'Text',
//           $ref: '#/definitions/Text',
//         },
//       ],
//     },
//     taxonRank: {
//       title: 'taxonRank (Recommended)',
//       propertyOrder: 2,
//       description: 'Schema.org: The taxonomic rank of this taxon given preferably as a URI from a controlled vocabulary (typically the ranks from TDWG TaxonRank ontology or equivalent Wikidata URIs) ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//           {
//             title: 'PropertyValue',
//             $ref: '#/definitions/PropertyValue',
//           },
//           {
//             title: 'URL',
//             $ref: '#/definitions/URL',
//           },
//         ],
//       },
//     },
//     url: {
//       title: 'url (Recommended)',
//       propertyOrder: 2,
//       description: 'Bioschemas: Link to the webpage associated to this taxon Schema.org: URL of the item. ',
//       oneOf: [
//         {
//           title: 'URL',
//           $ref: '#/definitions/URL',
//         },
//       ],
//     },
//     vernacularName: {
//       title: 'vernacularName (Optional)',
//       propertyOrder: 3,
//       description: 'Bioschemas: A vernacular (common) name of the taxon ',
//       type: 'array',
//       items: {
//         oneOf: [
//           {
//             title: 'Text',
//             $ref: '#/definitions/Text',
//           },
//         ],
//       },
//     },
//   },
//   required: [
//     '@type',
//     '@context',
//     'dct:conformsTo',
//     'name',
//   ],
// });

export default files;
