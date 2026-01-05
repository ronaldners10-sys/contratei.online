import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Filter, Briefcase, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <BrainCircuit className="mb-4 h-12 w-12 text-primary" />,
      title: "Análise de Currículo com IA",
      description: "Nossa IA identifica palavras-chave e compatibilidade, otimizando a seleção de candidatos.",
    },
    {
      icon: <Filter className="mb-4 h-12 w-12 text-primary" />,
      title: "Recomendações Inteligentes",
      description: "Receba sugestões de vagas personalizadas para seu perfil e recomendações de candidatos ideais para sua vaga.",
    },
    {
      icon: <Briefcase className="mb-4 h-12 w-12 text-primary" />,
      title: "Painel Intuitivo para Candidatos",
      description: "Gerencie seu perfil, envie seu currículo e acompanhe suas candidaturas de forma simples e eficaz.",
    },
    {
      icon: <Building className="mb-4 h-12 w-12 text-primary" />,
      title: "Ferramentas para Empresas",
      description: "Cadastre vagas, filtre currículos com IA e comunique-se com os melhores talentos do mercado.",
    },
  ];

  const faqItems = [
    {
      question: "Como funciona a análise de currículos por IA?",
      answer: "Utilizamos a API do Google Gemini para ler e interpretar os currículos enviados. A IA identifica habilidades, experiências e outras informações relevantes, comparando-as com os requisitos das vagas para calcular um score de compatibilidade, ajudando recrutadores a focar nos melhores candidatos.",
    },
    {
      question: "A plataforma é gratuita para candidatos?",
      answer: "Sim! Candidatos podem criar perfis, fazer upload de currículos, buscar vagas e se candidatar sem nenhum custo.",
    },
    {
      question: "Quais são os planos para empresas?",
      answer: "Oferecemos um plano gratuito com funcionalidades básicas e planos Premium com recursos avançados, como filtros ilimitados com IA, maior visibilidade para as vagas e painéis de análise detalhados. Confira nossa seção de preços para mais detalhes.",
    },
    {
      question: "Meus dados estão seguros?",
      answer: "A segurança dos seus dados é nossa prioridade. Utilizamos a infraestrutura segura do Firebase para armazenamento e autenticação, garantindo que suas informações pessoais e profissionais estejam protegidas.",
    },
  ];

  return (
    <div className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container grid grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Conectando <span className="text-primary">talentos</span> a <span className="text-accent">oportunidades</span> com inteligência.
            </h1>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground md:mx-0">
              A Contratei.Online é a plataforma de recrutamento que usa IA para encontrar o match perfeito entre empresas e candidatos. Rápido, preciso e intuitivo.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/signup">
                  Encontrar Vagas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signup">
                  Publicar uma Vaga
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="https://picsum.photos/seed/hero/1200/800"
              alt="Ambiente de trabalho moderno"
              fill
              className="object-cover"
              data-ai-hint="modern office"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-card py-20 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              Por que escolher a Contratei.Online?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Recursos pensados para otimizar seu tempo e maximizar seus resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              Planos para todos os tamanhos de empresa
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comece de graça e evolua conforme sua necessidade.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Candidato</CardTitle>
                <p className="text-4xl font-bold">Grátis</p>
                <p className="text-muted-foreground">Para sempre.</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Perfil completo</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Upload de currículo</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Candidaturas ilimitadas</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Recomendações de vagas</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href="/signup">Criar Perfil</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col border-2 border-primary shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Empresa PRO</CardTitle>
                  <div className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">Popular</div>
                </div>
                <p className="text-4xl font-bold">R$199<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
                <p className="text-muted-foreground">Para empresas que contratam ativamente.</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Tudo do Básico, e mais:</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Publicações de vagas ilimitadas</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Filtros com IA avançados</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Painel de Analytics</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Suporte prioritário</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href="/signup">Começar Agora</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Empresa Básico</CardTitle>
                <p className="text-4xl font-bold">Grátis</p>
                <p className="text-muted-foreground">Para começar a contratar.</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />1 vaga ativa por vez</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Receba até 50 candidaturas</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Filtros básicos</li>
                  <li className="flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Comunicação com candidatos</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/signup">Publicar Vaga Grátis</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-card py-20 md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              Perguntas Frequentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
            Pronto para encontrar o match perfeito?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Junte-se a milhares de empresas e profissionais que confiam na Contratei.Online para o próximo passo em suas carreiras e negócios.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/signup">
                Comece Agora - É Grátis! <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
