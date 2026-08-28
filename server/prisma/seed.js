import 'dotenv/config'
import pkg from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const { PrismaClient } = pkg
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding started...')

  // Clear existing data (safe to run repeatedly during development)
  await prisma.ticket.deleteMany()
  await prisma.asset.deleteMany()
  await prisma.knowledgeArticle.deleteMany()
  await prisma.user.deleteMany()
  await prisma.location.deleteMany()

  const locationNames = ['Dammam', 'Khobar', 'Jubail', 'Riyadh']
  const locations = {}

  for (const name of locationNames) {
    const location = await prisma.location.create({
      data: { name, country: 'Saudi Arabia' },
    })
    locations[name] = location
  }
  console.log(`Created ${locationNames.length} locations`)

  const userData = [
    { name: 'Sara Al Otaibi', dept: 'Finance', title: 'Financial Analyst', loc: 'Dammam', role: 'Employee' },
    { name: 'Faisal Al Harbi', dept: 'IT', title: 'Systems Administrator', loc: 'Khobar', role: 'Admin' },
    { name: 'Noura Al Qahtani', dept: 'HR', title: 'HR Coordinator', loc: 'Riyadh', role: 'Employee' },
    { name: 'Khalid Al Mutairi', dept: 'Sales', title: 'Sales Executive', loc: 'Khobar', role: 'Employee' },
    { name: 'Omar Al Zahrani', dept: 'IT', title: 'IT Technician', loc: 'Dammam', role: 'IT Technician' },
    { name: 'Yousef Al Dossari', dept: 'IT', title: 'IT Technician', loc: 'Jubail', role: 'IT Technician' },
    { name: 'Layla Al Ghamdi', dept: 'Marketing', title: 'Marketing Specialist', loc: 'Riyadh', role: 'Employee' },
    { name: 'Abdullah Al Shehri', dept: 'Operations', title: 'Operations Manager', loc: 'Dammam', role: 'Employee' },
    { name: 'Hind Al Anazi', dept: 'Finance', title: 'Accountant', loc: 'Khobar', role: 'Employee' },
    { name: 'Turki Al Rashid', dept: 'IT', title: 'IT Technician', loc: 'Riyadh', role: 'IT Technician' },
    { name: 'Maha Al Subaie', dept: 'HR', title: 'Recruiter', loc: 'Dammam', role: 'Employee' },
    { name: 'Bandar Al Amri', dept: 'Sales', title: 'Sales Manager', loc: 'Jubail', role: 'Employee' },
    { name: 'Reem Al Harthi', dept: 'Operations', title: 'Logistics Coordinator', loc: 'Khobar', role: 'Employee' },
    { name: 'Saad Al Malki', dept: 'IT', title: 'Network Engineer', loc: 'Dammam', role: 'IT Technician' },
    { name: 'Amal Al Zahrani', dept: 'Marketing', title: 'Content Creator', loc: 'Riyadh', role: 'Employee' },
    { name: 'Mishaal Al Dawsari', dept: 'Finance', title: 'Finance Manager', loc: 'Khobar', role: 'Employee' },
    { name: 'Ghada Al Otaibi', dept: 'HR', title: 'HR Manager', loc: 'Dammam', role: 'Admin' },
    { name: 'Fahad Al Qahtani', dept: 'Sales', title: 'Account Executive', loc: 'Jubail', role: 'Employee' },
    { name: 'Dana Al Mutairi', dept: 'Operations', title: 'Operations Analyst', loc: 'Riyadh', role: 'Employee' },
    { name: 'Nasser Al Ghamdi', dept: 'IT', title: 'IT Support Specialist', loc: 'Khobar', role: 'IT Technician' },
    { name: 'Sultan Al Harbi', dept: 'IT', title: 'IT Manager', loc: 'Dammam', role: 'Admin' },
  ]

  const users = []
  let empCounter = 1

  for (const u of userData) {
    const firstInitial = u.name.charAt(0).toLowerCase()
    const lastName = u.name.split(' ').slice(1).join('').toLowerCase().replace(/\s/g, '')
    const email = `${firstInitial}${lastName}@nexdesk.com`
    const employeeId = `ND-SAU-${String(empCounter).padStart(3, '0')}`

    const user = await prisma.user.create({
      data: {
        employeeId,
        name: u.name,
        email,
        department: u.dept,
        jobTitle: u.title,
        role: u.role,
      },
    })
    users.push(user)
    empCounter++
  }
  console.log(`Created ${users.length} users`)

    // --- ASSETS ---
  const assetTypes = ['Laptop', 'Desktop', 'Monitor', 'Printer', 'Scanner', 'Docking Station', 'Network Equipment']
  const manufacturers = {
    Laptop: ['Dell Latitude 5440', 'HP ProBook 450', 'Lenovo ThinkPad T14', 'HP EliteBook 840'],
    Desktop: ['Dell OptiPlex 7010', 'HP EliteDesk 800'],
    Monitor: ['Dell P2422H', 'HP E24 G5'],
    Printer: ['HP LaserJet Pro M404', 'Canon imageCLASS MF445'],
    Scanner: ['Epson WorkForce ES-400', 'Canon imageFORMULA'],
    'Docking Station': ['Dell WD19S', 'HP USB-C Dock G5'],
    'Network Equipment': ['Cisco Catalyst 2960', 'Ubiquiti UniFi Switch'],
  }
  const statuses = ['Active', 'Active', 'Active', 'Available', 'Under Repair', 'Retired']

  const assets = []
  for (let i = 1; i <= 55; i++) {
    const type = assetTypes[i % assetTypes.length]
    const modelOptions = manufacturers[type]
    const modelFull = modelOptions[i % modelOptions.length]
    const [manufacturer, ...modelParts] = modelFull.split(' ')
    const status = statuses[i % statuses.length]
    const location = locations[locationNames[i % locationNames.length]]
    const assignUser = status === 'Active' ? users[i % users.length] : null

    const asset = await prisma.asset.create({
      data: {
        assetTag: `AST-${String(i).padStart(4, '0')}`,
        type,
        manufacturer,
        model: modelParts.join(' '),
        serialNumber: `SN-${type.slice(0, 3).toUpperCase()}-${1000 + i}`,
        os: ['Laptop', 'Desktop'].includes(type) ? 'Windows 11' : null,
        status,
        purchaseDate: new Date(2022, i % 12, (i % 28) + 1),
        warrantyExpiry: new Date(2025, i % 12, (i % 28) + 1),
        notes: '',
        locationId: location.id,
        assignedUserId: assignUser ? assignUser.id : null,
      },
    })
    assets.push(asset)
  }
  console.log(`Created ${assets.length} assets`)

  // --- TICKETS ---
  const categories = ['Hardware', 'Software', 'Network', 'Printer', 'Account Access', 'Email']
  const priorities = ['Low', 'Medium', 'High', 'Critical']
  const ticketStatuses = ['Open', 'In Progress', 'Waiting', 'Resolved', 'Closed']
  const ticketTitles = [
    'Laptop wont boot after update',
    'Printer offline in office',
    'New employee needs email account',
    'Network drops intermittently',
    'Cannot access shared drive',
    'Excel crashes on large spreadsheets',
    'Monitor flickering on startup',
    'VPN connection keeps dropping',
    'Password reset request',
    'Docking station not detecting monitor',
  ]

  const technicians = users.filter((u) => u.role === 'IT Technician' || u.role === 'Admin')

  const tickets = []
  for (let i = 1; i <= 25; i++) {
    const status = ticketStatuses[i % ticketStatuses.length]
    const requester = users[i % users.length]
    const technician = status === 'Open' ? null : technicians[i % technicians.length]
    const relatedAsset = i % 3 === 0 ? null : assets[i % assets.length]
    const location = locations[locationNames[i % locationNames.length]]

    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-${1000 + i}`,
        title: ticketTitles[i % ticketTitles.length],
        description: `Reported issue: ${ticketTitles[i % ticketTitles.length]}. Needs investigation.`,
        category: categories[i % categories.length],
        priority: priorities[i % priorities.length],
        status,
        resolution: status === 'Resolved' || status === 'Closed' ? 'Issue resolved after troubleshooting.' : null,
        locationId: location.id,
        assetId: relatedAsset ? relatedAsset.id : null,
        requesterId: requester.id,
        technicianId: technician ? technician.id : null,
      },
    })
    tickets.push(ticket)
  }
  console.log(`Created ${tickets.length} tickets`)

  // --- KNOWLEDGE ARTICLES ---
  const articleData = [
    { title: 'Windows 11 Laptop Setup', category: 'Hardware', problem: 'A new laptop needs to be prepared for an employee before handoff.', steps: ['Unbox and connect to power and network.', 'Complete Windows 11 setup with company account.', 'Join device to domain or Intune.', 'Install standard software.', 'Run Windows Update.', 'Label and register the device.'], solution: 'Device fully provisioned and ready for handoff.' },
    { title: 'Printer Offline Troubleshooting', category: 'Printer', problem: 'A network printer shows as offline.', steps: ['Confirm network connection and IP.', 'Ping the printer IP.', 'Restart the print spooler.', 'Re-add the printer.', 'Restart the printer if needed.'], solution: 'Printer connection restored.' },
    { title: 'Network Connectivity Troubleshooting', category: 'Network', problem: 'A workstation cannot reach the network.', steps: ['Check cable or wifi status.', 'Run ipconfig /all.', 'Release and renew IP.', 'Ping the gateway.', 'Ping an external address.'], solution: 'Connectivity restored.' },
    { title: 'RJ45 Cable Testing', category: 'Network', problem: 'Suspected faulty ethernet cable.', steps: ['Inspect cable and connectors.', 'Test with a cable tester.', 'Swap in a known good cable.', 'Replace faulty cable.'], solution: 'Faulty cable replaced.' },
    { title: 'Basic DNS Troubleshooting', category: 'Network', problem: 'Websites fail to resolve by name.', steps: ['Ping an IP directly to isolate DNS.', 'Flush local DNS cache.', 'Confirm correct DNS server.', 'Test with nslookup.'], solution: 'DNS resolution restored.' },
    { title: 'Laptop Performance Troubleshooting', category: 'Hardware', problem: 'A laptop is running slow.', steps: ['Check Task Manager for high usage processes.', 'Confirm free disk space.', 'Run antivirus scan.', 'Disable startup bloat.', 'Install pending updates.'], solution: 'Performance restored.' },
    { title: 'Monitor and Docking Station Setup', category: 'Hardware', problem: 'External monitor not detected through docking station.', steps: ['Confirm dock is powered and connected.', 'Update docking station drivers.', 'Try a different display port.', 'Restart the laptop.'], solution: 'Monitor now detected correctly.' },
    { title: 'Windows Update Troubleshooting', category: 'Software', problem: 'Windows Update is stuck or failing.', steps: ['Restart the Windows Update service.', 'Run the built in troubleshooter.', 'Clear the update cache folder.', 'Retry the update.'], solution: 'Updates installed successfully.' },
    { title: 'Microsoft Intune Device Enrollment', category: 'Account Access', problem: 'A device needs to be enrolled in company device management.', steps: ['Sign in with the company account.', 'Open Settings and Access Work or School.', 'Connect to the organization.', 'Wait for policy sync.'], solution: 'Device enrolled and compliant.' },
    { title: 'Basic IT Security Checklist', category: 'Software', problem: 'New device needs baseline security configuration.', steps: ['Confirm antivirus is active.', 'Enable disk encryption.', 'Confirm firewall is on.', 'Apply latest security updates.'], solution: 'Device meets baseline security requirements.' },
  ]

  const articles = []
  for (const a of articleData) {
    const author = technicians[articles.length % technicians.length]
    const article = await prisma.knowledgeArticle.create({
      data: {
        title: a.title,
        category: a.category,
        problem: a.problem,
        steps: a.steps,
        solution: a.solution,
        authorId: author.id,
      },
    })
    articles.push(article)
  }
  console.log(`Created ${articles.length} knowledge articles`)

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })