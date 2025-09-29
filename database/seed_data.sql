/*
System: Suno Automation
Module: Database Seeder
Purpose: Seed sample data into profile and thesis tables for testing and development.
*/

-- Clear existing data (optional - comment out if you want to append)
TRUNCATE TABLE tblthesis CASCADE;
TRUNCATE TABLE tblprofiles CASCADE;

-- Seed data for tblprofiles
INSERT INTO tblprofiles (
    prf_user_id,
    prf_name,
    prf_email,
    prf_affiliation,
    prf_department,
    prf_image_url,
    prf_degree_program,
    prf_author_bio
) VALUES
    (gen_random_uuid(), 'Dr. Maria Santos', 'maria.santos@university.edu', 'State University', 'Computer Science', 'https://www.fakepersongenerator.com/Face/female/female20161024494051067.jpg', 'PhD Computer Science', 'Specializes in machine learning and artificial intelligence research with 15 years of experience.'),
    (gen_random_uuid(), 'Prof. John Chen', 'john.chen@university.edu', 'State University', 'Mathematics', 'https://www.fakepersongenerator.com/Face/male/male1085226063049.jpg', 'PhD Applied Mathematics', 'Research interests include computational mathematics and numerical analysis.'),
    (gen_random_uuid(), 'Dr. Sarah Johnson', 'sarah.johnson@university.edu', 'State University', 'Biology', 'https://www.fakepersongenerator.com/Face/female/female1022925263092.jpg', 'PhD Molecular Biology', 'Expert in genetics and molecular biology with focus on cancer research.'),
    (gen_random_uuid(), 'Prof. Michael Rodriguez', 'michael.rodriguez@university.edu', 'State University', 'Engineering', 'https://www.fakepersongenerator.com/Face/male/male1084813960144.jpg', 'PhD Mechanical Engineering', 'Specializes in robotics and automation systems.'),
    (gen_random_uuid(), 'Dr. Emily Williams', 'emily.williams@university.edu', 'State University', 'Psychology', 'https://www.fakepersongenerator.com/Face/female/female1021964918640.jpg', 'PhD Clinical Psychology', 'Research focuses on cognitive behavioral therapy and mental health interventions.'),
    (gen_random_uuid(), 'Prof. David Kim', 'david.kim@university.edu', 'State University', 'Physics', 'https://www.fakepersongenerator.com/Face/male/male20171086332531250.jpg', 'PhD Quantum Physics', 'Expert in quantum mechanics and theoretical physics.'),
    (gen_random_uuid(), 'Dr. Lisa Anderson', 'lisa.anderson@university.edu', 'State University', 'Chemistry', 'https://www.fakepersongenerator.com/Face/female/female20171026036883575.jpg', 'PhD Organic Chemistry', 'Specializes in pharmaceutical chemistry and drug development.'),
    (gen_random_uuid(), 'Prof. Robert Taylor', 'robert.taylor@university.edu', 'State University', 'Economics', 'https://www.fakepersongenerator.com/Face/male/male1085122373169.jpg', 'PhD Economics', 'Research interests include macroeconomics and financial markets.'),
    (gen_random_uuid(), 'Dr. Jennifer Brown', 'jennifer.brown@university.edu', 'State University', 'Education', 'https://www.fakepersongenerator.com/Face/female/female20161025502961609.jpg', 'PhD Educational Psychology', 'Expert in curriculum development and educational technology.'),
    (gen_random_uuid(), 'Prof. James Davis', 'james.davis@university.edu', 'State University', 'History', 'https://www.fakepersongenerator.com/Face/male/male20171084089898926.jpg', 'PhD Modern History', 'Specializes in 20th century world history and international relations.');

-- Seed data for tblthesis
INSERT INTO tblthesis (
    ths_prf_id,
    ths_title,
    ths_department,
    ths_submitted_date,
    ths_publication_date,
    ths_abstract,
    ths_keywords,
    ths_file_url,
    ths_doi
)
SELECT
    prf_id,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN 'Deep Learning Approaches for Natural Language Processing in Healthcare Systems'
        WHEN prf_name = 'Prof. John Chen' THEN 'Novel Algorithms for Solving Non-Linear Differential Equations'
        WHEN prf_name = 'Dr. Sarah Johnson' THEN 'Genetic Markers in Early Detection of Breast Cancer: A Comprehensive Study'
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN 'Autonomous Navigation Systems for Industrial Robots Using Computer Vision'
        WHEN prf_name = 'Dr. Emily Williams' THEN 'Effectiveness of Cognitive Behavioral Therapy in Treating Adolescent Depression'
        WHEN prf_name = 'Prof. David Kim' THEN 'Quantum Entanglement and Its Applications in Quantum Computing'
        WHEN prf_name = 'Dr. Lisa Anderson' THEN 'Synthesis of Novel Organic Compounds for Targeted Cancer Therapy'
        WHEN prf_name = 'Prof. Robert Taylor' THEN 'Impact of Monetary Policy on Emerging Market Economies During Financial Crises'
        WHEN prf_name = 'Dr. Jennifer Brown' THEN 'Integration of Artificial Intelligence in Modern Educational Frameworks'
        WHEN prf_name = 'Prof. James Davis' THEN 'The Cold War Era: A Comprehensive Analysis of Diplomatic Relations 1945-1991'
    END,
    prf_department,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN '2023-03-15'::date
        WHEN prf_name = 'Prof. John Chen' THEN '2023-04-20'::date
        WHEN prf_name = 'Dr. Sarah Johnson' THEN '2023-02-10'::date
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN '2023-05-05'::date
        WHEN prf_name = 'Dr. Emily Williams' THEN '2023-01-25'::date
        WHEN prf_name = 'Prof. David Kim' THEN '2023-06-15'::date
        WHEN prf_name = 'Dr. Lisa Anderson' THEN '2023-03-30'::date
        WHEN prf_name = 'Prof. Robert Taylor' THEN '2023-04-10'::date
        WHEN prf_name = 'Dr. Jennifer Brown' THEN '2023-02-28'::date
        WHEN prf_name = 'Prof. James Davis' THEN '2023-05-20'::date
    END,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN '2023-06-15'::date
        WHEN prf_name = 'Prof. John Chen' THEN '2023-07-20'::date
        WHEN prf_name = 'Dr. Sarah Johnson' THEN '2023-05-10'::date
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN '2023-08-05'::date
        WHEN prf_name = 'Dr. Emily Williams' THEN '2023-04-25'::date
        WHEN prf_name = 'Prof. David Kim' THEN '2023-09-15'::date
        WHEN prf_name = 'Dr. Lisa Anderson' THEN '2023-06-30'::date
        WHEN prf_name = 'Prof. Robert Taylor' THEN '2023-07-10'::date
        WHEN prf_name = 'Dr. Jennifer Brown' THEN '2023-05-28'::date
        WHEN prf_name = 'Prof. James Davis' THEN '2023-08-20'::date
    END,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN 'This research presents novel deep learning architectures specifically designed for processing and understanding medical texts in healthcare systems. The study introduces a hybrid model combining transformer-based architectures with domain-specific knowledge graphs to improve accuracy in medical entity recognition and relation extraction. Extensive experiments on multiple healthcare datasets demonstrate significant improvements over existing baselines.'
        WHEN prf_name = 'Prof. John Chen' THEN 'This dissertation develops innovative numerical methods for solving complex non-linear differential equations that arise in various scientific and engineering applications. The proposed algorithms demonstrate superior convergence rates and stability properties compared to traditional methods. Applications to fluid dynamics and heat transfer problems validate the effectiveness of these approaches.'
        WHEN prf_name = 'Dr. Sarah Johnson' THEN 'This comprehensive study identifies novel genetic markers associated with early-stage breast cancer development. Through large-scale genomic analysis of patient samples, we discovered specific gene expression patterns that can predict cancer susceptibility with 92% accuracy. These findings have significant implications for developing personalized screening protocols and preventive treatments.'
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN 'This research presents an advanced autonomous navigation system for industrial robots utilizing state-of-the-art computer vision techniques. The system integrates deep learning-based object detection, SLAM algorithms, and path planning strategies to enable safe and efficient navigation in dynamic industrial environments. Field tests in manufacturing facilities demonstrate 40% improvement in navigation efficiency.'
        WHEN prf_name = 'Dr. Emily Williams' THEN 'This longitudinal study examines the effectiveness of Cognitive Behavioral Therapy (CBT) in treating adolescent depression across diverse populations. Results from a randomized controlled trial with 500 participants show significant reduction in depressive symptoms, with 78% of treated adolescents showing clinical improvement. The study also identifies key factors that predict treatment success.'
        WHEN prf_name = 'Prof. David Kim' THEN 'This theoretical and experimental investigation explores quantum entanglement phenomena and their practical applications in quantum computing systems. We demonstrate novel methods for maintaining quantum coherence and reducing decoherence effects, achieving record-breaking entanglement fidelity. These advances pave the way for more reliable quantum processors.'
        WHEN prf_name = 'Dr. Lisa Anderson' THEN 'This research focuses on the design and synthesis of novel organic compounds with enhanced selectivity for cancer cells. Through systematic structural modifications and biological testing, we identified lead compounds that show 10-fold higher toxicity to cancer cells compared to normal cells. These findings contribute to the development of next-generation targeted cancer therapeutics.'
        WHEN prf_name = 'Prof. Robert Taylor' THEN 'This comprehensive analysis examines how monetary policy decisions in developed economies affect emerging markets during periods of financial instability. Using econometric models and data from 25 emerging economies over 30 years, we identify transmission mechanisms and quantify spillover effects. Policy recommendations for central banks are provided based on empirical findings.'
        WHEN prf_name = 'Dr. Jennifer Brown' THEN 'This study investigates the integration of artificial intelligence tools in modern educational settings, focusing on personalized learning systems. Through implementation in 50 schools, we demonstrate that AI-powered adaptive learning platforms improve student outcomes by 35% while reducing teacher workload. Guidelines for effective AI integration in education are presented.'
        WHEN prf_name = 'Prof. James Davis' THEN 'This comprehensive historical analysis examines diplomatic relations during the Cold War period, utilizing newly declassified documents from multiple national archives. The study provides fresh insights into key turning points and decision-making processes that shaped international relations. Special attention is given to proxy conflicts and their long-term geopolitical consequences.'
    END,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN 'deep learning, natural language processing, healthcare, medical text analysis, transformer models'
        WHEN prf_name = 'Prof. John Chen' THEN 'non-linear equations, numerical methods, computational mathematics, convergence analysis, stability'
        WHEN prf_name = 'Dr. Sarah Johnson' THEN 'breast cancer, genetic markers, early detection, genomics, personalized medicine'
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN 'robotics, autonomous navigation, computer vision, industrial automation, path planning'
        WHEN prf_name = 'Dr. Emily Williams' THEN 'cognitive behavioral therapy, adolescent depression, mental health, clinical psychology, treatment efficacy'
        WHEN prf_name = 'Prof. David Kim' THEN 'quantum entanglement, quantum computing, quantum mechanics, coherence, decoherence'
        WHEN prf_name = 'Dr. Lisa Anderson' THEN 'organic chemistry, cancer therapy, drug synthesis, targeted therapy, pharmaceutical chemistry'
        WHEN prf_name = 'Prof. Robert Taylor' THEN 'monetary policy, emerging markets, financial crises, spillover effects, macroeconomics'
        WHEN prf_name = 'Dr. Jennifer Brown' THEN 'artificial intelligence, education technology, personalized learning, adaptive systems, curriculum development'
        WHEN prf_name = 'Prof. James Davis' THEN 'Cold War, diplomatic history, international relations, proxy conflicts, geopolitics'
    END,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN '/files/thesis/santos_2023_deep_learning_nlp.pdf'
        WHEN prf_name = 'Prof. John Chen' THEN '/files/thesis/chen_2023_nonlinear_algorithms.pdf'
        WHEN prf_name = 'Dr. Sarah Johnson' THEN '/files/thesis/johnson_2023_breast_cancer_genetics.pdf'
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN '/files/thesis/rodriguez_2023_robot_navigation.pdf'
        WHEN prf_name = 'Dr. Emily Williams' THEN '/files/thesis/williams_2023_cbt_adolescent.pdf'
        WHEN prf_name = 'Prof. David Kim' THEN '/files/thesis/kim_2023_quantum_entanglement.pdf'
        WHEN prf_name = 'Dr. Lisa Anderson' THEN '/files/thesis/anderson_2023_cancer_compounds.pdf'
        WHEN prf_name = 'Prof. Robert Taylor' THEN '/files/thesis/taylor_2023_monetary_policy.pdf'
        WHEN prf_name = 'Dr. Jennifer Brown' THEN '/files/thesis/brown_2023_ai_education.pdf'
        WHEN prf_name = 'Prof. James Davis' THEN '/files/thesis/davis_2023_cold_war_diplomacy.pdf'
    END,
    CASE
        WHEN prf_name = 'Dr. Maria Santos' THEN '10.1234/thesis.2023.santos.001'
        WHEN prf_name = 'Prof. John Chen' THEN '10.1234/thesis.2023.chen.002'
        WHEN prf_name = 'Dr. Sarah Johnson' THEN '10.1234/thesis.2023.johnson.003'
        WHEN prf_name = 'Prof. Michael Rodriguez' THEN '10.1234/thesis.2023.rodriguez.004'
        WHEN prf_name = 'Dr. Emily Williams' THEN '10.1234/thesis.2023.williams.005'
        WHEN prf_name = 'Prof. David Kim' THEN '10.1234/thesis.2023.kim.006'
        WHEN prf_name = 'Dr. Lisa Anderson' THEN '10.1234/thesis.2023.anderson.007'
        WHEN prf_name = 'Prof. Robert Taylor' THEN '10.1234/thesis.2023.taylor.008'
        WHEN prf_name = 'Dr. Jennifer Brown' THEN '10.1234/thesis.2023.brown.009'
        WHEN prf_name = 'Prof. James Davis' THEN '10.1234/thesis.2023.davis.010'
    END
FROM tblprofiles;

-- Add additional thesis entries for some authors (multiple publications)
INSERT INTO tblthesis (
    ths_prf_id,
    ths_title,
    ths_department,
    ths_submitted_date,
    ths_publication_date,
    ths_abstract,
    ths_keywords,
    ths_file_url,
    ths_doi
)
SELECT
    prf_id,
    'Machine Learning Applications in Medical Image Analysis: A Survey and New Approaches',
    'Computer Science',
    '2024-01-10'::date,
    '2024-04-10'::date,
    'This comprehensive survey examines the state-of-the-art in machine learning techniques for medical image analysis. We review recent advances in convolutional neural networks, vision transformers, and hybrid models for tasks including segmentation, classification, and detection in medical imaging. Additionally, we propose novel architectures that achieve superior performance on benchmark datasets.',
    'medical imaging, machine learning, computer vision, deep learning, healthcare AI',
    '/files/thesis/santos_2024_medical_imaging.pdf',
    '10.1234/thesis.2024.santos.011'
FROM tblprofiles
WHERE prf_name = 'Dr. Maria Santos';

INSERT INTO tblthesis (
    ths_prf_id,
    ths_title,
    ths_department,
    ths_submitted_date,
    ths_publication_date,
    ths_abstract,
    ths_keywords,
    ths_file_url,
    ths_doi
)
SELECT
    prf_id,
    'Advanced Statistical Methods for Big Data Analytics in Biological Systems',
    'Mathematics',
    '2024-02-15'::date,
    '2024-05-15'::date,
    'This research develops novel statistical methodologies for analyzing large-scale biological datasets. We introduce dimensionality reduction techniques and probabilistic models specifically designed for genomic and proteomic data. The proposed methods demonstrate significant improvements in computational efficiency and accuracy when applied to cancer genomics datasets.',
    'big data, statistical methods, bioinformatics, dimensionality reduction, biological systems',
    '/files/thesis/chen_2024_biostatistics.pdf',
    '10.1234/thesis.2024.chen.012'
FROM tblprofiles
WHERE prf_name = 'Prof. John Chen';

INSERT INTO tblthesis (
    ths_prf_id,
    ths_title,
    ths_department,
    ths_submitted_date,
    ths_publication_date,
    ths_abstract,
    ths_keywords,
    ths_file_url,
    ths_doi
)
SELECT
    prf_id,
    'CRISPR-Cas9 Gene Editing for Hereditary Cancer Prevention: Clinical Trial Results',
    'Biology',
    '2024-03-05'::date,
    '2024-06-05'::date,
    'This groundbreaking clinical trial evaluates the safety and efficacy of CRISPR-Cas9 gene editing technology in preventing hereditary breast and ovarian cancer. We report results from Phase II trials involving 150 participants with BRCA1/BRCA2 mutations. The study demonstrates successful gene correction in 85% of cases with minimal off-target effects.',
    'CRISPR, gene editing, hereditary cancer, BRCA mutations, clinical trial',
    '/files/thesis/johnson_2024_crispr_cancer.pdf',
    '10.1234/thesis.2024.johnson.013'
FROM tblprofiles
WHERE prf_name = 'Dr. Sarah Johnson';

-- Display summary
SELECT 'Database seeded successfully!' AS status;
SELECT 'Profiles created: ' || COUNT(*) AS summary FROM tblprofiles;
SELECT 'Thesis records created: ' || COUNT(*) AS summary FROM tblthesis;