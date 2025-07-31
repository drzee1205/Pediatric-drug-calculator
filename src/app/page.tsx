"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calculator, Weight, Ruler, Heart, Brain, Droplets, Bone, Shield, Activity, Stethoscope, Kidney, Eye, Ear, Baby, User, Download, Bell, Settings, Smartphone, Wifi, WifiOff, Share2, TestTube, Syringe, Monitor } from "lucide-react"

interface MedicalSystem {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

interface Drug {
  id: string
  name: string
  genericName?: string
  brandName?: string
  description?: string
  indications?: string
  contraindications?: string
  sideEffects?: string
  monitoring?: string
  medicalSystemId: string
}

interface Dosage {
  id: string
  drugId: string
  ageGroup: string
  weightRange?: string
  dose: string
  frequency?: string
  route?: string
  maxDose?: string
  minDose?: string
  notes?: string
}

const medicalSystems: MedicalSystem[] = [
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
  { id: "16", name: "Neonatology", description: "Neonatal care and complications", icon: "👶", category: "Neonatology" },
  { id: "17", name: "Adolescent Medicine", description: "Puberty, mental health, risk behaviors", icon: "🧑‍⚕️", category: "Adolescent" }
]

export default function PediatricDrugCalculator() {
  const [patientAge, setPatientAge] = useState<string>("")
  const [patientWeight, setPatientWeight] = useState<string>("")
  const [selectedSystem, setSelectedSystem] = useState<string>("")
  const [selectedDrug, setSelectedDrug] = useState<string>("")
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [dosages, setDosages] = useState<Dosage[]>([])
  const [calculatedDose, setCalculatedDose] = useState<string>("")
  const [calculationDetails, setCalculationDetails] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const [showInstallDialog, setShowInstallDialog] = useState<boolean>(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)
  const [recentCalculations, setRecentCalculations] = useState<any[]>([])

  // PWA Installation and Service Worker Setup
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration)
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error)
        })
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Load recent calculations from localStorage
    const savedCalculations = localStorage.getItem('recentCalculations')
    if (savedCalculations) {
      setRecentCalculations(JSON.parse(savedCalculations))
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted')
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Handle app installation
  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const choiceResult = await installPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true)
      }
      setInstallPrompt(null)
      setShowInstallDialog(false)
    }
  }

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === 'granted')
      
      if (permission === 'granted') {
        // Send a welcome notification
        new Notification('Pediatric Drug Calculator', {
          body: 'Notifications enabled! You will receive dosage reminders.',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png'
        })
      }
    }
  }

  // Save calculation to recent calculations
  const saveCalculation = (calculation: any) => {
    const newCalculation = {
      ...calculation,
      timestamp: new Date().toISOString(),
      id: Date.now()
    }
    
    const updatedCalculations = [newCalculation, ...recentCalculations].slice(0, 10)
    setRecentCalculations(updatedCalculations)
    localStorage.setItem('recentCalculations', JSON.stringify(updatedCalculations))
  }

  // Touch gesture support
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>("calculator")

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next tab
      const tabs = ["calculator", "recent", "drugs"]
      const currentIndex = tabs.indexOf(activeTab)
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1])
      }
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right - previous tab
      const tabs = ["calculator", "recent", "drugs"]
      const currentIndex = tabs.indexOf(activeTab)
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1])
      }
    }
  }

  // Share calculation
  const shareCalculation = async (calculation: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pediatric Drug Calculation',
          text: `Calculated dose: ${calculation.dose} for ${calculation.weight}kg patient`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Calculated dose: ${calculation.dose} for ${calculation.weight}kg patient`)
      alert('Calculation copied to clipboard!')
    }
  }

  useEffect(() => {
    if (selectedSystem) {
      fetchDrugs()
    }
  }, [selectedSystem])

  useEffect(() => {
    if (selectedDrug) {
      fetchDosages()
    }
  }, [selectedDrug])

  const fetchDrugs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/drugs?systemId=${selectedSystem}`)
      if (response.ok) {
        const data = await response.json()
        setDrugs(data)
      }
    } catch (error) {
      console.error("Error fetching drugs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDosages = async () => {
    try {
      const response = await fetch(`/api/dosages?drugId=${selectedDrug}`)
      if (response.ok) {
        const data = await response.json()
        setDosages(data)
      }
    } catch (error) {
      console.error("Error fetching dosages:", error)
    }
  }

  const calculateDose = () => {
    if (!patientWeight || !selectedDrug || dosages.length === 0) {
      return
    }

    const weight = parseFloat(patientWeight)
    if (isNaN(weight) || weight <= 0) {
      return
    }

    const appropriateDosage = dosages.find(dosage => {
      if (!dosage.weightRange) return false
      
      const range = dosage.weightRange.replace("kg", "").trim()
      const [min, max] = range.split("-").map(w => parseFloat(w.trim()))
      
      if (min && max) {
        return weight >= min && weight <= max
      } else if (min) {
        return weight >= min
      }
      return false
    })

    if (appropriateDosage) {
      const doseRange = appropriateDosage.dose
      const doseMatch = doseRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*mg\/kg\/day/)
      
      if (doseMatch) {
        const minDose = parseFloat(doseMatch[1])
        const maxDose = parseFloat(doseMatch[2])
        
        const calculatedMin = (minDose * weight).toFixed(1)
        const calculatedMax = (maxDose * weight).toFixed(1)
        
        const doseResult = `${calculatedMin} - ${calculatedMax} mg/day`
        setCalculatedDose(doseResult)
        setCalculationDetails(`
          <div class="space-y-2">
            <p><strong>Patient Weight:</strong> ${weight} kg</p>
            <p><strong>Dosage Range:</strong> ${minDose} - ${maxDose} mg/kg/day</p>
            <p><strong>Frequency:</strong> ${appropriateDosage.frequency || "Not specified"}</p>
            <p><strong>Route:</strong> ${appropriateDosage.route || "Not specified"}</p>
            <p><strong>Maximum Dose:</strong> ${appropriateDosage.maxDose || "Not specified"}</p>
            <p><strong>Notes:</strong> ${appropriateDosage.notes || "None"}</p>
          </div>
        `)

        // Save calculation to recent calculations
        const selectedDrugObj = drugs.find(d => d.id === selectedDrug)
        const selectedSystemObj = medicalSystems.find(s => s.id === selectedSystem)
        
        saveCalculation({
          dose: doseResult,
          weight: weight,
          drugName: selectedDrugObj?.name || 'Unknown',
          systemName: selectedSystemObj?.name || 'Unknown',
          frequency: appropriateDosage.frequency,
          route: appropriateDosage.route
        })

        // Send notification if enabled
        if (notificationsEnabled) {
          new Notification('Dosage Calculated', {
            body: `${doseResult} for ${selectedDrugObj?.name}`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png'
          })
        }
      } else {
        setCalculatedDose("Dosage calculation format not recognized")
        setCalculationDetails("Please consult the dosage information manually")
      }
    } else {
      setCalculatedDose("No appropriate dosage found for this weight")
      setCalculationDetails("Please consult a healthcare professional")
    }
  }

  const getSystemIcon = (icon: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "🧠": <Brain className="w-6 h-6" />,
      "🫁": <Activity className="w-6 h-6" />,
      "❤️": <Heart className="w-6 h-6" />,
      "🧬": <Shield className="w-6 h-6" />,
      "💧": <Droplets className="w-6 h-6" />,
      "🦴": <Bone className="w-6 h-6" />,
      "🔬": <TestTube className="w-6 h-6" />,
      "💉": <Syringe className="w-6 h-6" />,
      "🔥": <Activity className="w-6 h-6" />,
      "🧪": <TestTube className="w-6 h-6" />,
      "🧫": <Stethoscope className="w-6 h-6" />,
      "⚕️": <Monitor className="w-6 h-6" />,
      "👁️": <Eye className="w-6 h-6" />,
      "👂": <Ear className="w-6 h-6" />,
      "👶": <Baby className="w-6 h-6" />,
      "🧑‍⚕️": <User className="w-6 h-6" />
    }
    return iconMap[icon] || <Calculator className="w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* PWA Header with App-like Features */}
      <div className="max-w-6xl mx-auto">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-gray-600">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {!isInstalled && installPrompt && (
              <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="w-4 h-4" />
                    Install App
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Install Pediatric Drug Calculator</DialogTitle>
                    <DialogDescription>
                      Install this app on your device for quick access and offline functionality.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowInstallDialog(false)}>
                      Later
                    </Button>
                    <Button onClick={handleInstall}>
                      Install Now
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {!notificationsEnabled && (
              <Button variant="outline" size="sm" className="gap-1" onClick={requestNotificationPermission}>
                <Bell className="w-4 h-4" />
                Enable Notifications
              </Button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>App Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button 
                      variant={notificationsEnabled ? "default" : "outline"} 
                      size="sm"
                      onClick={requestNotificationPermission}
                    >
                      {notificationsEnabled ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>App Status</span>
                    <span className="text-sm text-gray-600">
                      {isInstalled ? 'Installed' : 'Not Installed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Recent Calculations</span>
                    <span className="text-sm text-gray-600">
                      {recentCalculations.length} saved
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Pediatric Drug Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Evidence-based dosing from Nelson Textbook of Pediatrics
          </p>
          {isInstalled && (
            <Badge variant="secondary" className="mt-2">
              <Smartphone className="w-3 h-3 mr-1" />
              Installed as App
            </Badge>
          )}
        </div>

        {/* Tabbed Interface with Touch Support */}
        <div 
          className="bg-white rounded-lg shadow-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="drugs" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Drugs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient Information */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ruler className="w-5 h-5" />
                      Patient Information
                    </CardTitle>
                    <CardDescription>
                      Enter patient details for accurate dosage calculation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="age">Age (months)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 24"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 15.5"
                        value={patientWeight}
                        onChange={(e) => setPatientWeight(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Medical System Selection */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Medical System
                    </CardTitle>
                    <CardDescription>
                      Select the medical system for drug selection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a medical system" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicalSystems.map((system) => (
                          <SelectItem key={system.id} value={system.id}>
                            <div className="flex items-center gap-2">
                              <span>{system.icon}</span>
                              <span>{system.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedSystem && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getSystemIcon(medicalSystems.find(s => s.id === selectedSystem)?.icon || "")}
                          <span className="font-semibold">
                            {medicalSystems.find(s => s.id === selectedSystem)?.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {medicalSystems.find(s => s.id === selectedSystem)?.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Drug Selection */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Weight className="w-5 h-5" />
                      Drug Selection
                    </CardTitle>
                    <CardDescription>
                      Select a drug for dosage calculation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedDrug} onValueChange={setSelectedDrug} disabled={!selectedSystem || isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoading ? "Loading drugs..." : "Select a drug"} />
                      </SelectTrigger>
                      <SelectContent>
                        {drugs.map((drug) => (
                          <SelectItem key={drug.id} value={drug.id}>
                            <div>
                              <div className="font-medium">{drug.name}</div>
                              {drug.genericName && (
                                <div className="text-xs text-gray-500">{drug.genericName}</div>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedDrug && (
                      <div className="mt-4">
                        <Button 
                          onClick={calculateDose} 
                          disabled={!patientWeight}
                          className="w-full"
                        >
                          Calculate Dose
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Calculations
                  </CardTitle>
                  <CardDescription>
                    Your recent dosage calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentCalculations.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {recentCalculations.map((calc) => (
                        <div key={calc.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {calc.systemName}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(calc.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="font-medium text-lg">{calc.drugName}</div>
                              <div className="text-lg font-semibold text-blue-600 mb-1">{calc.dose}</div>
                              <div className="text-sm text-gray-600">
                                Weight: {calc.weight}kg
                                {calc.frequency && ` • ${calc.frequency}`}
                                {calc.route && ` • ${calc.route}`}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => shareCalculation(calc)}
                              className="ml-2"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No recent calculations yet.</p>
                      <p className="text-sm">Use the calculator to see your calculations here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drugs" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Drug Database
                  </CardTitle>
                  <CardDescription>
                    Browse available drugs by medical system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicalSystems.map((system) => (
                      <div key={system.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          {getSystemIcon(system.icon)}
                          <div>
                            <h3 className="font-semibold">{system.name}</h3>
                            <p className="text-sm text-gray-600">{system.description}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {system.id === selectedSystem ? (
                            <span className="text-green-600">
                              {drugs.length} drugs loaded
                            </span>
                          ) : (
                            <span>Click to load drugs</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Results Section - Shows in all tabs when calculated */}
        {calculatedDose && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Dosage Calculation Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Calculated Dose</h3>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {calculatedDose}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Calculation Details</h3>
                  <div 
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                    dangerouslySetInnerHTML={{ __html: calculationDetails }}
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const calculation = {
                      dose: calculatedDose,
                      weight: patientWeight
                    }
                    shareCalculation(calculation)
                  }}
                  className="gap-1"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dosage Information */}
        {dosages.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dosage Information</CardTitle>
              <CardDescription>
                Complete dosage guidelines for the selected drug
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dosages.map((dosage) => (
                  <div key={dosage.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <strong>Age Group:</strong> {dosage.ageGroup}
                      </div>
                      <div>
                        <strong>Weight Range:</strong> {dosage.weightRange || "Not specified"}
                      </div>
                      <div>
                        <strong>Dose:</strong> {dosage.dose}
                      </div>
                      <div>
                        <strong>Frequency:</strong> {dosage.frequency || "Not specified"}
                      </div>
                      <div>
                        <strong>Route:</strong> {dosage.route || "Not specified"}
                      </div>
                      <div>
                        <strong>Max Dose:</strong> {dosage.maxDose || "Not specified"}
                      </div>
                    </div>
                    {dosage.notes && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded">
                        <strong>Notes:</strong> {dosage.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Alert className="mt-6">
          <AlertDescription>
            <strong>Disclaimer:</strong> This calculator is for educational purposes only. 
            Always verify dosages with current medical references and consult with a qualified 
            healthcare professional before administering any medication. The developers of this 
            tool are not responsible for any errors or omissions in dosage calculations.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}