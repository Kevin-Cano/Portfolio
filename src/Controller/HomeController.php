<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        // Charger les projets depuis le fichier YAML
        $projectsFile = $this->getParameter('kernel.project_dir') . '/config/projects.yaml';
        
        $projects = [];
        if (file_exists($projectsFile)) {
            $data = Yaml::parseFile($projectsFile);
            $projects = $data['projects'] ?? [];
        }

        return $this->render('home/index.html.twig', [
            'projects' => $projects,
        ]);
    }

    #[Route('/project/{slug}', name: 'project_detail')]
    public function projectDetail(string $slug): Response
    {
        // Charger les projets
        $projectsFile = $this->getParameter('kernel.project_dir') . '/config/projects.yaml';
        
        $project = null;
        if (file_exists($projectsFile)) {
            $data = Yaml::parseFile($projectsFile);
            $projects = $data['projects'] ?? [];
            
            foreach ($projects as $p) {
                if (($p['slug'] ?? '') === $slug) {
                    $project = $p;
                    break;
                }
            }
        }

        if (!$project) {
            throw $this->createNotFoundException('Projet non trouvé');
        }

        return $this->render('home/project_detail.html.twig', [
            'project' => $project,
        ]);
    }
}

