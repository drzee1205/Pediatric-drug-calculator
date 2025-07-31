import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Genetics & Metabolic Disorders drugs from Nelson's Textbook of Pediatrics
const geneticsDrugs = [
  {
    name: "Sodium Phenylbutyrate",
    genericName: "Sodium Phenylbutyrate",
    brandName: "Buphenyl",
    description: "Urea cycle disorder treatment",
    indications: "Urea cycle disorders (ornithine transcarbamylase deficiency, citrullinemia, argininosuccinic aciduria)",
    contraindications: "Hypersensitivity to phenylbutyrate, severe renal impairment",
    sideEffects: "Menstrual irregularities, decreased appetite, body odor, taste disturbances",
    monitoring: "Ammonia levels, plasma amino acids, liver function tests, nutritional status",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "450-600 mg/kg/day",
        frequency: "q6h",
        route: "PO",
        maxDose: "20 g/day",
        notes: "Divide daily dose and administer with meals"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "450-600 mg/kg/day",
        frequency: "q6h",
        route: "PO",
        maxDose: "20 g/day",
        notes: "Monitor plasma amino acid levels regularly"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "9.9-13 g/m²/day",
        frequency: "q6h",
        route: "PO",
        maxDose: "40 g/day",
        notes: "Adjust dose based on ammonia levels and growth"
      }
    ]
  },
  {
    name: "N-carbamylglutamate",
    genericName: "N-carbamylglutamate",
    brandName: "Carbaglu",
    description: "N-acetylglutamate synthase activator",
    indications: "N-acetylglutamate synthase deficiency, hyperammonemia",
    contraindications: "Hypersensitivity to N-carbamylglutamate",
    sideEffects: "Headache, abdominal pain, vomiting, anemia, pyrexia",
    monitoring: "Ammonia levels, plasma amino acids, liver function tests",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Dissolve tablets in water before administration"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Adjust dose based on ammonia levels"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Lifelong therapy required"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "4-8 g/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Monitor plasma glutamine levels"
      }
    ]
  },
  {
    name: "Nitrogen Scavenger",
    genericName: "Sodium Benzoate + Sodium Phenylacetate",
    brandName: "Ammonul",
    description: "Nitrogen scavenger for hyperammonemia",
    indications: "Acute hyperammonemia due to urea cycle disorders",
    contraindications: "Hypersensitivity to benzoate or phenylacetate, severe renal impairment",
    sideEffects: "Nausea, vomiting, headache, hypokalemia, metabolic acidosis",
    monitoring: "Ammonia levels, electrolytes, acid-base status, renal function",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "Loading: 250 mg/kg benzoate + 250 mg/kg phenylacetate",
        frequency: "Maintenance: 250-500 mg/kg/day each",
        route: "IV",
        maxDose: "5 g/day each",
        notes: "Must be diluted and administered through central line"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "Loading: 250 mg/kg benzoate + 250 mg/kg phenylacetate",
        frequency: "Maintenance: 250-500 mg/kg/day each",
        route: "IV",
        maxDose: "5 g/day each",
        notes: "Infuse over 90-120 minutes"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "Loading: 250 mg/kg benzoate + 250 mg/kg phenylacetate",
        frequency: "Maintenance: 250-500 mg/kg/day each",
        route: "IV",
        maxDose: "5 g/day each",
        notes: "Monitor for hypokalemia and metabolic acidosis"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "Loading: 5.5 g/m² benzoate + 5.5 g/m² phenylacetate",
        frequency: "Maintenance: 5.5-11 g/m²/day each",
        route: "IV",
        maxDose: "12 g/day each",
        notes: "Use with hemodialysis in severe cases"
      }
    ]
  },
  {
    name: "Carglumic Acid",
    genericName: "Carglumic Acid",
    brandName: "Carbaglu",
    description: "N-acetylglutamate synthase activator",
    indications: "N-acetylglutamate synthase deficiency, hyperammonemia",
    contraindications: "Hypersensitivity to carglumic acid",
    sideEffects: "GI upset, headache, vomiting, anemia, pyrexia",
    monitoring: "Ammonia levels, plasma amino acids, liver function tests",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Neonate",
        weightRange: "2-4 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Disperse tablets in water before administration"
      },
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Adjust dose based on ammonia levels"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "100-250 mg/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Lifelong therapy required"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "4-8 g/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "8 g/day",
        notes: "Monitor plasma glutamine levels"
      }
    ]
  },
  {
    name: "Betaine",
    genericName: "Betaine Anhydrous",
    brandName: "Cystadane",
    description: "Homocysteine-lowering agent",
    indications: "Homocystinuria, hyperhomocysteinemia",
    contraindications: "Hypersensitivity to betaine",
    sideEffects: "GI upset, nausea, diarrhea, body odor",
    monitoring: "Homocysteine levels, methionine levels, renal function",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "100-200 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "6 g/day",
        notes: "Dissolve powder in water before administration"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "100-200 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "6 g/day",
        notes: "Monitor homocysteine levels monthly initially"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "6-20 g/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "20 g/day",
        notes: "Divide daily dose into 2 administrations"
      }
    ]
  },
  {
    name: "Nitisinone",
    genericName: "Nitisinone",
    brandName: "Orfadin",
    description: "4-hydroxyphenylpyruvate dioxygenase inhibitor",
    indications: "Hereditary tyrosinemia type 1",
    contraindications: "Hypersensitivity to nitisinone",
    sideEffects: "Elevated tyrosine levels, keratopathy, leukopenia, thrombocytopenia",
    monitoring: "Tyrosine levels, liver function tests, ophthalmologic exams, blood counts",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "0.6-1 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "2 mg/kg/day",
        notes: "Must be combined with tyrosine-restricted diet"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.6-1 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "2 mg/kg/day",
        notes: "Monitor plasma tyrosine levels weekly initially"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-2 mg/kg/day",
        frequency: "q12-24h",
        route: "PO",
        maxDose: "80 mg/day",
        notes: "Lifelong therapy required"
      }
    ]
  },
  {
    name: "Sapropterin",
    genericName: "Sapropterin Dihydrochloride",
    brandName: "Kuvan",
    description: "Synthetic form of tetrahydrobiopterin (BH4)",
    indications: "Phenylketonuria (PKU), BH4 deficiencies",
    contraindications: "Hypersensitivity to sapropterin",
    sideEffects: "Headache, diarrhea, abdominal pain, upper respiratory infection",
    monitoring: "Phenylalanine levels, nutritional status, therapeutic response",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "10-20 mg/kg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "20 mg/kg/day",
        notes: "Take with food to improve absorption"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "10-20 mg/kg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "20 mg/kg/day",
        notes: "May allow liberalization of phenylalanine-restricted diet"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "10-20 mg/kg/day",
        frequency: "q24h",
        route: "PO",
        maxDose: "20 mg/kg/day",
        notes: "Monitor phenylalanine levels regularly"
      }
    ]
  },
  {
    name: "Alglucosidase Alfa",
    genericName: "Alglucosidase Alfa",
    brandName: "Myozyme, Lumizyme",
    description: "Recombinant human acid alpha-glucosidase",
    indications: "Pompe disease (glycogen storage disease type II)",
    contraindications: "Hypersensitivity to alglucosidase alfa",
    sideEffects: "Infusion reactions, anaphylaxis, hypoglycemia, renal impairment",
    monitoring: "Infusion reactions, anti-drug antibodies, renal function, cardiac function",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "20 mg/kg every 2 weeks",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "20 mg/kg/dose",
        notes: "Infuse over 4 hours, premedicate with antihistamines"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "20 mg/kg every 2 weeks",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "20 mg/kg/dose",
        notes: "Monitor for infusion reactions"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "20 mg/kg every 2 weeks",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "20 mg/kg/dose",
        notes: "Lifelong enzyme replacement therapy"
      }
    ]
  },
  {
    name: "Imiglucerase",
    genericName: "Imiglucerase",
    brandName: "Cerezyme",
    description: "Recombinant human beta-glucocerebrosidase",
    indications: "Gaucher disease type 1 and 3",
    contraindications: "Hypersensitivity to imiglucerase",
    sideEffects: "Infusion reactions, anaphylaxis, headache, dizziness",
    monitoring: "Infusion reactions, anti-drug antibodies, therapeutic response",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "60 U/kg every 2 weeks",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "60 U/kg/dose",
        notes: "Infuse over 1-2 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "60 U/kg every 2 weeks",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "60 U/kg/dose",
        notes: "Dose may be adjusted based on response"
      }
    ]
  },
  {
    name: "Laronidase",
    genericName: "Laronidase",
    brandName: "Aldurazyme",
    description: "Recombinant human alpha-L-iduronidase",
    indications: "Mucopolysaccharidosis I (Hurler, Hurler-Scheie, Scheie syndromes)",
    contraindications: "Hypersensitivity to laronidase",
    sideEffects: "Infusion reactions, anaphylaxis, flushing, headache, hypotension",
    monitoring: "Infusion reactions, anti-drug antibodies, urinary GAG levels",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.58 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "0.58 mg/kg/dose",
        notes: "Infuse over 3-4 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.58 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "0.58 mg/kg/dose",
        notes: "Premedicate with antihistamines and corticosteroids"
      }
    ]
  },
  {
    name: "Idursulfase",
    genericName: "Idursulfase",
    brandName: "Elaprase",
    description: "Recombinant human iduronate-2-sulfatase",
    indications: "Mucopolysaccharidosis II (Hunter syndrome)",
    contraindications: "Hypersensitivity to idursulfase",
    sideEffects: "Infusion reactions, anaphylaxis, headache, hypertension",
    monitoring: "Infusion reactions, anti-drug antibodies, urinary GAG levels",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "0.5 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "0.5 mg/kg/dose",
        notes: "Infuse over 3 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "0.5 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "0.5 mg/kg/dose",
        notes: "Monitor for infusion reactions closely"
      }
    ]
  },
  {
    name: "Galsulfase",
    genericName: "Galsulfase",
    brandName: "Naglazyme",
    description: "Recombinant human N-acetylgalactosamine 4-sulfatase",
    indications: "Mucopolysaccharidosis VI (Maroteaux-Lamy syndrome)",
    contraindications: "Hypersensitivity to galsulfase",
    sideEffects: "Infusion reactions, anaphylaxis, headache, abdominal pain",
    monitoring: "Infusion reactions, anti-drug antibodies, urinary GAG levels",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "1 mg/kg/dose",
        notes: "Infuse over 4 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "1 mg/kg/dose",
        notes: "Premedication recommended"
      }
    ]
  },
  {
    name: "Vestronidase Alfa",
    genericName: "Vestronidase Alfa-vjbk",
    brandName: "Mepsevii",
    description: "Recombinant human beta-glucuronidase",
    indications: "Mucopolysaccharidosis VII (Sly syndrome)",
    contraindications: "Hypersensitivity to vestronidase alfa",
    sideEffects: "Infusion reactions, anaphylaxis, diarrhea, rash",
    monitoring: "Infusion reactions, anti-drug antibodies, urinary GAG levels",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "4 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "4 mg/kg/dose",
        notes: "Infuse over 4 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "4 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "4 mg/kg/dose",
        notes: "Premedicate with antihistamines"
      }
    ]
  },
  {
    name: "Elosulfase Alfa",
    genericName: "Elosulfase Alfa",
    brandName: "Vimizim",
    description: "Recombinant human N-acetylgalactosamine-6-sulfatase",
    indications: "Mucopolysaccharidosis IVA (Morquio A syndrome)",
    contraindications: "Hypersensitivity to elosulfase alfa",
    sideEffects: "Infusion reactions, anaphylaxis, headache, hypertension",
    monitoring: "Infusion reactions, anti-drug antibodies, urinary GAG levels",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "2 mg/kg/dose",
        notes: "Infuse over 3.5-4.5 hours"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "2 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "2 mg/kg/dose",
        notes: "Monitor for anaphylaxis"
      }
    ]
  },
  {
    name: "Sebelipase Alfa",
    genericName: "Sebelipase Alfa",
    brandName: "Kanuma",
    description: "Recombinant human lysosomal acid lipase",
    indications: "Lysosomal acid lipase deficiency (Wolman disease, CESD)",
    contraindications: "Hypersensitivity to sebelipase alfa",
    sideEffects: "Infusion reactions, anaphylaxis, diarrhea, abdominal pain",
    monitoring: "Infusion reactions, anti-drug antibodies, liver function tests",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1 mg/kg once weekly initially, then 3 mg/kg once weekly",
        frequency: "q7 days",
        route: "IV infusion",
        maxDose: "3 mg/kg/dose",
        notes: "For rapidly progressive LAL deficiency"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1 mg/kg once every other week",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "3 mg/kg/dose",
        notes: "For slowly progressive LAL deficiency"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1 mg/kg once every other week",
        frequency: "q14 days",
        route: "IV infusion",
        maxDose: "3 mg/kg/dose",
        notes: "Infuse over 1-2 hours"
      }
    ]
  },
  {
    name: "Asfotase Alfa",
    genericName: "Asfotase Alfa",
    brandName: "Strensiq",
    description: "Recombinant human tissue-nonspecific alkaline phosphatase",
    indications: "Hypophosphatasia",
    contraindications: "Hypersensitivity to asfotase alfa",
    sideEffects: "Injection site reactions, lipodystrophy, ectopic calcifications",
    monitoring: "Injection sites, calcium and phosphate levels, renal function",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "2 mg/kg three times weekly",
        frequency: "Mon-Wed-Fri",
        route: "SC",
        maxDose: "6 mg/kg/week",
        notes: "For perinatal/infantile onset"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "2 mg/kg three times weekly",
        frequency: "Mon-Wed-Fri",
        route: "SC",
        maxDose: "6 mg/kg/week",
        notes: "Rotate injection sites"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1 mg/kg/kg three times weekly",
        frequency: "Mon-Wed-Fri",
        route: "SC",
        maxDose: "3 mg/kg/week",
        notes: "For juvenile onset"
      }
    ]
  },
  {
    name: "Cerliponase Alfa",
    genericName: "Cerliponase Alfa",
    brandName: "Brineura",
    description: "Recombinant human tripeptidyl peptidase 1",
    indications: "Late infantile neuronal ceroid lipofuscinosis type 2 (CLN2)",
    contraindications: "Hypersensitivity to cerliponase alfa",
    sideEffects: "Infusion reactions, seizures, device complications, hypotension",
    monitoring: "Infusion reactions, CSF protein, ECG, vital signs",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "300 mg every other week",
        frequency: "q14 days",
        route: "Intraventricular infusion",
        maxDose: "300 mg/dose",
        notes: "Requires surgical implantation of reservoir"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "300 mg every other week",
        frequency: "q14 days",
        route: "Intraventricular infusion",
        maxDose: "300 mg/dose",
        notes: "Infuse over 4.5 hours"
      }
    ]
  },
  {
    name: "Lucerastat",
    genericName: "Lucerastat",
    brandName: "Lucerastat",
    description: "Glucosylceramide synthase inhibitor",
    indications: "Gaucher disease type 1",
    contraindications: "Hypersensitivity to lucerastat",
    sideEffects: "Headache, diarrhea, abdominal pain, back pain",
    monitoring: "Therapeutic response, adverse effects",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1000 mg twice daily",
        frequency: "q12h",
        route: "PO",
        maxDose: "2000 mg/day",
        notes: "Oral substrate reduction therapy"
      }
    ]
  },
  {
    name: "Miglustat",
    genericName: "Miglustat",
    brandName: "Zavesca",
    description: "Glucosylceramide synthase inhibitor",
    indications: "Gaucher disease type 1, Niemann-Pick disease type C",
    contraindications: "Hypersensitivity to miglustat",
    sideEffects: "Diarrhea, weight loss, tremor, peripheral neuropathy",
    monitoring: "Weight, neurological function, GI tolerance",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "100 mg three times daily",
        frequency: "q8h",
        route: "PO",
        maxDose: "300 mg/day",
        notes: "Take between meals"
      }
    ]
  },
  {
    name: "Eliglustat",
    genericName: "Eliglustat",
    brandName: "Cerdelga",
    description: "Glucosylceramide synthase inhibitor",
    indications: "Gaucher disease type 1",
    contraindications: "Hypersensitivity to eliglustat, CYP2D6 poor metabolizers",
    sideEffects: "Fatigue, headache, diarrhea, nausea, back pain",
    monitoring: "CYP2D6 genotype, therapeutic response, ECG",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "84 mg twice daily (CYP2D6 extensive metabolizers)",
        frequency: "q12h",
        route: "PO",
        maxDose: "168 mg/day",
        notes: "Dose based on CYP2D6 metabolizer status"
      }
    ]
  },
  {
    name: "Triheptanoin",
    genericName: "Triheptanoin",
    brandName: "Dojolvi",
    description: "Medium-chain triglyceride",
    indications: "Long-chain fatty acid oxidation disorders",
    contraindications: "Hypersensitivity to triheptanoin",
    sideEffects: "GI upset, abdominal pain, diarrhea, elevated liver enzymes",
    monitoring: "Liver function tests, growth, nutritional status",
    medicalSystemId: "4",
    dosages: [
      {
        ageGroup: "Infant",
        weightRange: "5-10 kg",
        dose: "1-4 mL/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "4 mL/kg/day",
        notes: "Take with meals and snacks"
      },
      {
        ageGroup: "Child",
        weightRange: "10-40 kg",
        dose: "1-4 mL/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "4 mL/kg/day",
        notes: "Divide total daily dose between meals"
      },
      {
        ageGroup: "Adolescent",
        weightRange: ">40 kg",
        dose: "1-4 mL/kg/day",
        frequency: "q6-8h",
        route: "PO",
        maxDose: "4 mL/kg/day",
        notes: "Monitor for GI intolerance"
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    let createdCount = 0
    let dosageCount = 0

    for (const drugData of geneticsDrugs) {
      const { dosages, ...drug } = drugData
      
      // Create drug
      const createdDrug = await db.drug.create({
        data: drug
      })
      
      createdCount++
      
      // Create dosages for this drug
      for (const dosage of dosages) {
        await db.dosage.create({
          data: {
            ...dosage,
            drugId: createdDrug.id
          }
        })
        dosageCount++
      }
    }

    return NextResponse.json({ 
      message: 'Genetics & Metabolic Disorders drugs seeded successfully',
      drugsCreated: createdCount,
      dosagesCreated: dosageCount
    })
  } catch (error) {
    console.error('Error seeding genetics drugs:', error)
    return NextResponse.json(
      { error: 'Failed to seed genetics drugs' },
      { status: 500 }
    )
  }
}