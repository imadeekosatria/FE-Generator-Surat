const fs = require('fs');
let code = fs.readFileSync('src/components/Stepper.tsx', 'utf8');
code = code.replace('interface StepperProps {', 'interface StepperProps {\n  type?: "pks" | "juknis";');
code = code.replace('export function Stepper({ currentStep }: StepperProps) {', 'export function Stepper({ currentStep, type = "pks" }: StepperProps) {');
code = code.replace('const steps = [', 'const steps = type === "juknis" ? [\n    { label: "Data Instansi & Wilayah", description: "Pihak Pertama" },\n    { label: "Teknis Jaringan", description: "Pihak Kedua" },\n    { label: "Elemen Data & PIC", description: "Detail" },\n  ] : [');
fs.writeFileSync('src/components/Stepper.tsx', code);
