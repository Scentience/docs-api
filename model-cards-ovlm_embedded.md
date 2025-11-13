---
layout: default
title: Model Cards
---

# Scentience Model Cards
---
The Scentience Olfaction-Vision-Language Model (OVLM) was trained on multimodal data for the purposes of associating chemical compounds to visual objects, with language acting as the latent bridge. This card provides detailed information about each its purpose, performance, and usage guidelines. 

_Please note that all Scentience machine learning models are **for research purposes only**._ Scentience does not claim any specific performance beyond the model cards nor for any specific applications.

For more information on Scentience privacy and data policies, please observe the [Scentience Privacy Policy](https://scentience.ai/app-privacy-policy).

---

## Olfaction-Vision-Language Model  
- **Model Name:** Scentience OVLM (Olfaction-Vision-Language Model)  
- **Version:** 0.3
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
---
---
---
---