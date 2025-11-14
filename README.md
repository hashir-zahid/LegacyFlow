# ⚖️ LegacyFlow

## 📖 Overview
**LegacyFlow** is a comprehensive **Islamic Inheritance Calculator** built with **React + Vite** that helps distribute property according to **Pakistani Islamic inheritance laws**.  
It calculates inheritance shares for legal heirs including sons, daughters, parents, spouses, and siblings, and allows for wills up to **33.33%** of the estate.

---

## ✨ Features

### 🎯 Accurate Islamic Calculations
Based on **Hanafi school of thought** and **Pakistani inheritance laws**.

### ⚖️ Gender-Specific Distribution
Different rules for **male and female deceased**.

### 📊 Visual Representation
Interactive **pie charts** showing distribution.

### 💼 Comprehensive Heir Management
Supports all legal heirs including:
- Children (Sons & Daughters)
- Parents (Mother & Father)
- Spouse (Husband/Wives)
- Siblings (Brothers & Sisters)
- Grandchildren
- Stepchildren (via Will)

### 📜 Will Management
Supports wills up to **33.33%** of the net estate.

### 💰 Financial Considerations
Deducts **debts** and **funeral expenses** automatically.

### 🌐 Multi-Currency Support
Supports **PKR**, **USD**, **EUR**, and **GBP**.

### 📱 Responsive Design
Works seamlessly across **mobile, tablet, and desktop**.

---

## 🚀 Getting Started

### 🧾 Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hashir-zahid/LegacyFlow.git
   cd legacyflow
2. **Install dependencies**
    ```bash
    npm install
3. **Start development server**
    ```bash
    npm run dev
4. **Build for production**
    ```bash
    npm run build
## 📐 Inheritance Rules Implemented

### 🩸 Priority Order
1. Funeral expenses  
2. Debts repayment  
3. Will execution *(max 33.33%)*  
4. Legal heirs distribution  

---

### ⚖️ Fixed Shares
- **Wife:** 1/8 *(with children)* or 1/4 *(no children)*  
- **Husband:** 1/4 *(with children)* or 1/2 *(no children)*  
- **Mother:** 1/6 *(with children or ≥2 siblings)* or 1/3 *(no children or <2 siblings)*  
- **Father:** 1/6 *(with children)* or **residue** *(no children)*  

---

### 👨‍👩‍👧‍👦 Residuary Heirs
- **Children:** Distributed at a **2:1 ratio** (son:daughter)  
- **Grandchildren:** Inherit when no direct children exist  
- **Siblings:** Eligible only when no children/grandchildren and father does not block inheritance  

---

## 🎯 Usage Guide

### Step 1: Enter Estate Information
- Select deceased gender  
- Input total property value  
- Specify debts and funeral expenses  

### Step 2: Add Heirs
- Enter number of sons and daughters  
- Add parents *(via checkboxes)*  
- Specify spouse information  
- Include siblings if applicable  

### Step 3: Will Configuration *(Optional)*
- Add stepchildren if any  
- Set will percentage *(max 33.33%)*  

### Step 4: Calculate
- View detailed distribution results  
- See visual **pie chart** representation  
- Check **individual shares** per heir  

---

## 🔧 Technical Implementation

### 🧮 Key Components

#### `Calculate.jsx`
- Manages main state and inheritance logic  
- Performs form validation and calculations  

#### `EstateInformation.jsx`
- Handles all input forms for estate and heirs  
- Supports dynamic fields based on gender  
- Validates **will percentage**  

#### `DistributionResult.jsx`
- Displays results using **Recharts Pie Chart**  
- Handles **currency formatting**  
- Designed to be **fully responsive**  

---
## 📱 Responsive Design
- **Mobile-first approach** for better usability on small screens  
- **Optimized layouts** for tablets and desktops  
- **Touch-friendly interface** ensuring smooth navigation across all devices  

---

## 🔒 Legal Disclaimer
> ⚠️ **Important:**  
> This calculator is designed for **educational and informational purposes only**.  
> While it adheres to **Islamic inheritance principles**, it should **not be considered legal advice**.  
> Always consult qualified **Islamic scholars** and **legal professionals** for actual inheritance distribution and legal matters.  

---

## 🤝 Contributing
We welcome contributions from the community!  

To contribute:
1. **Fork** the repository  
2. **Create** a new feature branch  
3. **Commit** your changes with clear messages  
4. **Push** your branch to your forked repository  
5. **Submit a Pull Request** for review  

---

