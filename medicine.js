window.onload = () => {
    let symptoms = localStorage.getItem("userSymptoms");
    let medicineList = document.getElementById("medicine-list");

    if (symptoms) {
        let suggestions = {
            "fever": "Paracetamol, drink plenty of fluids, and rest. Home remedy: Tulsi tea & warm water.",
            "cold": "Antihistamines, steam inhalation. Home remedy: Honey with ginger.",
            "cough": "Cough syrup, warm water. Home remedy: Turmeric milk.",
            "headache": "Pain relievers. Home remedy: Peppermint oil massage."
        };

        let foundMedicine = "No specific medicine found. Please consult a doctor.";
        for (let key in suggestions) {
            if (symptoms.toLowerCase().includes(key)) {
                foundMedicine = suggestions[key];
                break;
            }
        }

        medicineList.innerText = `Based on your symptoms (${symptoms}), suggested treatment: ${foundMedicine}`;
    } else {
        medicineList.innerText = "No symptoms detected. Please go back and speak your symptoms.";
    }
};
