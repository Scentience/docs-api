---
layout: default
title: Model Cards - Embeddings (Small)
---


# Model Card: Diffusion Graph Neural Network

[![Colab](https://img.shields.io/badge/Run%20in-Colab-yellow?logo=google-colab)](https://colab.research.google.com/drive/1z-ITTEfVtMMbfbN50u2AfQhzvuYkrRn7?usp=sharing)
[![Paper](https://img.shields.io/badge/Research-Paper-red)](https://arxiv.org/abs/2506.00455v4)
[![Open in Spaces](https://huggingface.co/datasets/huggingface/badges/resolve/main/open-in-hf-spaces-sm.svg)](https://huggingface.co/kordelfrance/diffusion-graph-olfaction-models)


An open-sourced diffusion-based equivariant graph neural network (DEGNN) for olfaction-vision-language tasks.

---

## Model Description

Navigation by scent is a capability in robotic systems that is rising in demand. 
However, current methods often suffer from ambiguities, particularly when robots misattribute odours to incorrect objects due to limitations in olfactory datasets and sensor resolutions. 
To address challenges in olfactory navigation, we introduce a novel machine learning method using diffusion-based molecular gen-
eration that can be used by itself or with automated olfactory
dataset construction pipelines. 
Our models, diffusion-based equivariant graph neural networks (`DEGNN` for short), leverage the state of the art in molecular generation and aroma mapping.
This generative process of our diffusion model expands the chemical space beyond the limitations
of both current olfactory datasets and training methods, enabling
the identification of potential odourant molecules not previously
documented. The generated molecules can then be more accurately validated using advanced olfactory sensors, enabling
them to detect more compounds and inform better hardware
design. By integrating visual analysis, language processing, and
molecular generation, our framework enhances the ability of
olfaction-vision models on robots to accurately associate odours
with their correct sources, thereby improving navigation and
decision-making through better sensor selection for a target
compound in critical applications such as explosives detection,
narcotics screening, and search and rescue. Our methodology
represents a foundational advancement in the field of artificial
olfaction, offering a scalable solution to challenges posed by
limited olfactory data and sensor ambiguities.

We offer two models with this repository:
 - (1) `DEGNN-constrained`: A diffusion model with its associated olfactory conditioner that is constrained to only generate molecules based on the atoms `C`, `N`, `O`, `F`, `P`, `S`, and `Cl`.
 - (2) `DEGNN-unconstrained`: A diffusion model with its associated olfactory conditioner that is unconstrained and may generate molecules from any atom.

---

## Model Details
- **Model Name:** `DEGNN Constrained`
- **Developed by:** Kordel K. France
- **Date:** September 2025
- **Architecture:**
  - **Olfaction conditioner:** Feedforward Neural Network
  - **Diffusion model:** Equivariant Graph Neural Network conditioned on atoms C, N, O, F, P, S, Cl
- **License:** MIT
- **Contact:** kordel@scentience.ai, kordel.france@utdallas.edu

---


- **Model Name:** `DEGNN Unconstrained`
- **Developed by:** Kordel K. France
- **Date:** September 2025
- **Architecture:**
  - **Olfaction conditioner:** Feedforward Neural Network
  - **Diffusion model:** Equivariant Graph Neural Network conditioned on all available atoms in training data
- **License:** MIT
- **Contact:** kordel@scentience.ai, kordel.france@utdallas.edu

---

## Intended Use
- **Primary purpose:** Research in multimodal machine learning involving olfaction, vision, and language.  
- **Example applications:**
  - Robotics and UAV navigation guided by chemical cues
  - Chemical dataset exploration and visualization
- **Intended users:** Researchers, developers, and educators working in ML, robotics, chemistry, and HCI.
- **Out of scope:** Not intended for safety-critical tasks (e.g., gas leak detection, medical diagnosis, or regulatory use).

---

## Training Data
- **Olfaction data:** Language-aligned olfactory data curated from GoodScents and LeffingWell datasets.
- **Vision data:** COCO dataset.
- **Language data:** Smell descriptors and text annotations curated from literature.

For more information on how the training data was accumulated, please see the [HuggingFace dataset URL here](https://huggingface.co/datasets/kordelfrance/olfaction-vision-language-dataset)

---

## Citation

If you use these models in your research, please cite as follows:

```bibtex
@misc{france2025diffusiongraphneuralnetworks,
      title={Diffusion Graph Neural Networks for Robustness in Olfaction Sensors and Datasets}, 
      author={Kordel K. France and Ovidiu Daescu},
      year={2025},
      eprint={2506.00455},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2506.00455v3}, 
}
```

---


## License

This dataset is released under the [MIT License](https://opensource.org/license/mit).
