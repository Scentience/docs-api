---
layout: default
title: Model Cards
---

# Scentience Model Cards
---
Welcome to the model cards for our Scentience ML models. These cards provide detailed information about each model's purpose, performance, and usage guidelines.

## Model S1: Multimodal Chemical Predictor

**Description:** ScentPredictor is a machine learning model designed to predict molecules present in a visual scene.

**Intended Use:** This model is intended for research in robotics, computational chemistry, virtual reality, fragrance design, and olfactory science. It can assist in virtual screening of compounds for desired scent profiles.

**Training Data:** Cross-modally trained from COCO vision dataset and open olfactory datasets including GoodScents and LeffingWell annotations.

**Evaluation Metrics:**

- Accuracy: 85%
- Precision: 82%
- Recall: 87%
- F1-Score: 84%

**Limitations:** The model may perform poorly on rare or novel scents not represented in the training data. It does not account for mixtures or environmental factors affecting perception.

**Ethical Considerations:** Ensure use complies with data privacy laws when handling proprietary chemical data. Avoid applications in deceptive marketing or harmful chemical synthesis.

**Version:** 1.0 | **Release Date:** August 2025 | **License:** Scentience Proprietary

---

## Model S2: Multimodal Olfactory Classifier

**Description:** OdorClassifier is an advanced classifier that categorizes odors into families (e.g., floral, woody, citrus) using multimodal inputs like text descriptions and molecular features.

**Intended Use:** Suitable for applications in robotics, virtual reality, perfumery, food science, and sensory AI systems. It can enhance recommendation engines for scents.

**Training Data:** Curated from 5,000+ perfume reviews, sensory panels, and chemical databases, augmented with visual data from the vision COCO dataset.

**Evaluation Metrics:**

- Accuracy: 92%
- Precision: 90%
- Recall: 91%
- F1-Score: 90%

**Limitations:** Biases in training data may lead to cultural-specific odor perceptions being underrepresented. Not suitable for real-time applications without optimization.

**Ethical Considerations:** Promote inclusivity by validating across diverse populations. Do not use for discriminatory purposes based on scent preferences.

**Version:** 1.0 | **Release Date:** August 2025 | **License:** Scentience Proprietary


---

## Olfaction-Vision-Language Model  
**Version:** 0.1  
**Date:** 2025-02-11  
**Developed by:** Scentience Robotics  

### Model Details

- **Model Name:** Scentience OVLM (Olfaction-Vision-Language Model)  
- **Version:** 0.1  
- **Developed by:** Scentience Robotics, LLC  
- **Model Type:** Multimodal model (olfaction, vision, language)  
- **License:** Scentience Proprietary  
- **Contact:** info@scentience.ai

### Intended Use

- **Primary Intended Use:**  
  - Research on multimodal understanding of sensory inputs (olfaction, vision, and language).  
  - Applications in robotics, UAVs, and environmental sensing.  
  - Exploration of multimodal reasoning tasks across different domains.  

- **Out-of-Scope Uses (Not Intended For):**  
  - Use in critical medical diagnostics or safety-critical decision making.  
  - Deployment without appropriate domain adaptation and testing.  
  - Use in surveillance contexts without explicit consent and legal approval.  

### Inputs & Outputs

- **Inputs**  
    - **Olfactory Data:** Encoded molecular/sensor readings.  
    - **Visual Data:** Images, video frames, or embeddings.  
    - **Text Data:** Natural language queries, instructions, or descriptions.  

- **Outputs**  
    - **Textual Output:** Natural language responses, descriptions, or classifications.  
    - **Multimodal Output:** Integrated reasoning across olfaction, vision, and language.  

### Performance

- **Instruction-Following Benchmark**
  - Achieves ~85.1% of GPT-4’s performance on synthetic visual instruction tuning tasks.  
  - Reaches 92.53% accuracy on Science QA when fine-tuned in conjunction with GPT-4

- **Reasoning Benchmarks**
  - Structured reasoning (LLaVA-CoT style) improved performance by +7.4% on reasoning-intensive multimodal tasks

- **Multimodal Benchmarking**
  - LLaVA-o1 averaged above 64 across multiple vision-language reasoning benchmarks, outperforming much larger models{index=9}

- **Robustness Metrics** (from NaturalBench)
  - **G-Acc (Group Accuracy):** Rewards correct responses across olfaction-image-question triples
  - **Q-Acc & I-Acc:** Detailed accuracy measures to identify bias or non-visual reasoning shortcuts

- **Known Strengths:**  
  - Robust multimodal alignment across sensory inputs.  
  - High interpretability in language grounding tasks.  
  - Extensible to new downstream tasks with fine-tuning.  

- **Known Limitations:**  
  - Performance depends on the quality of olfactory sensor data.  
  - Model may underperform on out-of-distribution sensory combinations.  
  - Computationally intensive for real-time UAV applications.  

### Ethical Considerations

- **Bias & Fairness:**  
  - Model may inherit biases from training corpora and sensor data.  
  - Requires auditing when applied in human-facing contexts.  

- **Safety:**  
  - Outputs should be validated before being used in decision-making.  
  - Not suitable for deployment in critical infrastructure without redundancy.  

- **Privacy:**  
  - Input data should not contain personally identifiable information.  
  - Use only in compliance with applicable data protection regulations.  

### Caveats & Recommendations

- The model is **research-grade** and not production-certified.  
- Fine-tuning and domain adaptation are encouraged before applied deployment.  
- Performance can vary significantly based on hardware and sensor configurations.  

### Citation

If you use this model in your research, please cite:  

```
@misc{scentience2025ovlm,
title={Scentience Olfaction-Vision-Language Model},
author={Scentience Robotics, LLC},
year={2025},
note={Version 0.3}
}
```

---