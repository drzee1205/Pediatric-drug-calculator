import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Medical systems data
const medicalSystems = [
  { id: "1", name: "Neurology", description: "Seizures, epilepsy, neuromuscular diseases", icon: "🧠", category: "Neurology" },
  { id: "2", name: "Respiratory System", description: "Asthma, pneumonia, bronchiolitis", icon: "🫁", category: "Respiratory" },
  { id: "3", name: "Cardiovascular System", description: "Heart defects, arrhythmias, heart failure", icon: "❤️", category: "Cardiovascular" },
  { id: "4", name: "Genetics & Metabolic Disorders", description: "Inborn errors, lysosomal storage diseases", icon: "🧬", category: "Genetics" },
  { id: "5", name: "Fluid, Electrolyte & Acid-Base", description: "Dehydration, electrolyte imbalances", icon: "💧", category: "Fluids" },
  { id: "6", name: "Musculoskeletal System", description: "Orthopedic problems, arthritis", icon: "🦴", category: "Musculoskeletal" },
  { id: "7", name: "Immunology", description: "Immunodeficiencies, hypersensitivities", icon: "🔬", category: "Immunology" },
  { id: "8", name: "Hematology & Oncology", description: "Anemias, leukemias, bleeding disorders", icon: "💉", category: "Hematology" },
  { id: "9", name: "Rheumatology", description: "Lupus, arthritis, vasculitis", icon: "🔥", category: "Rheumatology" },
  { id: "10", name: "Infectious Diseases", description: "Bacterial, viral, fungal infections", icon: "🧪", category: "Infectious" },
  { id: "11", name: "Gastrointestinal System", description: "GERD, IBD, liver diseases", icon: "🧫", category: "GI" },
  { id: "12", name: "Endocrinology", description: "Diabetes, thyroid, growth disorders", icon: "🧠", category: "Endocrinology" },
  { id: "13", name: "Nephrology & Urology", description: "Kidney disease, UTI, congenital anomalies", icon: "⚕️", category: "Nephrology" },
  { id: "14", name: "Ophthalmology", description: "Eye disorders and infections", icon: "👁️", category: "Ophthalmology" },
  { id: "15", name: "Otolaryngology (ENT)", description: "Ear, nose, and throat disorders", icon: "👂", category: "ENT" },
  { id: "16", name: "Dermatology", description: "Skin disorders and infections", icon: "🧴", category: "Dermatology" },
  { id: "17", name: "Neonatology", description: "Neonatal care and complications", icon: "👶", category: "Neonatology" },
  { id: "18", name: "Adolescent Medicine", description: "Puberty, mental health, risk behaviors", icon: "🧑‍⚕️", category: "Adolescent" }
]

export async function POST(request: NextRequest) {
  try {
    // Clear existing data
    await db.calculation.deleteMany()
    await db.dosage.deleteMany()
    await db.drug.deleteMany()
    await db.medicalSystem.deleteMany()

    // Insert medical systems
    for (const system of medicalSystems) {
      await db.medicalSystem.create({
        data: system
      })
    }

    return NextResponse.json({ 
      message: 'Medical systems seeded successfully',
      count: medicalSystems.length 
    })
  } catch (error) {
    console.error('Error seeding medical systems:', error)
    return NextResponse.json(
      { error: 'Failed to seed medical systems' },
      { status: 500 }
    )
  }
}