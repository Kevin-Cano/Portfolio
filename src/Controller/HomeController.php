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
        $projects = $this->getProjects();

        return $this->render('home/index.html.twig', [
            'projects' => $projects,
        ]);
    }

    #[Route('/project/{slug}', name: 'project_detail')]
    public function projectDetail(string $slug): Response
    {
        $projects = $this->getProjects();
        $project = null;

        foreach ($projects as $p) {
            if (($p['slug'] ?? '') === $slug) {
                $project = $p;
                break;
            }
        }

        if (!$project) {
            throw $this->createNotFoundException('Projet non trouvé');
        }

        return $this->render('home/project_detail.html.twig', [
            'project' => $project,
        ]);
    }

    #[Route('/projects', name: 'projects')]
    public function projects(): Response
    {
        $projects = $this->getProjects();

        return $this->render('home/projects.html.twig', [
            'projects' => $projects,
        ]);
    }

    #[Route('/profile', name: 'profile')]
    public function profile(): Response
    {
        return $this->render('home/profile.html.twig');
    }

    /**
     * Récupère la liste des projets depuis le fichier YAML de configuration.
     *
     * @return array<int, array<string, mixed>>
     */
    private function getProjects(): array
    {
        $projectsFile = $this->getParameter('kernel.project_dir') . '/config/projects.yaml';

        if (!file_exists($projectsFile)) {
            return [];
        }

        $data = Yaml::parseFile($projectsFile);

        return $data['projects'] ?? [];
    }
}

