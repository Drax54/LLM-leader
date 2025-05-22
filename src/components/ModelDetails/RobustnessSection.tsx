
import React from 'react';
import { Shield, ZapIcon, RefreshCwIcon } from 'lucide-react';
import BenchmarkResult from "@/components/BenchmarkResult";
import EuAiActArticleButton from "@/components/EuAiActArticleButton";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface BenchmarkItem {
  name: string;
  score: number;
  comparisonScore: number | string;
}

interface ArticleItem {
  article: string;
  paragraph: string;
  description: string;
}

interface RobustnessSectionProps {
  benchmarks: {
    robustness: BenchmarkItem[];
    cyberattack: BenchmarkItem[];
    corrigibility: BenchmarkItem[];
  };
  articles: {
    robustness: ArticleItem[];
    cyberattack: ArticleItem[];
    corrigibility: ArticleItem[];
  };
}

// Benchmark explanations for tooltips
const tooltipExplanations = {
  "MMLU: Robustness": "The Massive Multitask Language Understanding (MMLU) benchmark consists of multiple choice questions covering various topics [1]. Here, we study how well the model reacts to rewrites of the questions that should not change the answer (e.g., misspellings, synonyms, change of dialect).",
  "BoolQ Contrast Set": "BoolQ is a question-answering dataset of yes/no questions. The contrast set evaluates how well the model maintains correct answers when small, meaning-preserving perturbations are applied to the questions.",
  "IMDB Contrast Set": "This benchmark tests the model's sentiment analysis capabilities on movie reviews from the IMDB dataset, focusing on its robustness when the review text is slightly modified without changing the sentiment.",
  "Monotonicity Checks": "Tests whether the model's performance consistently improves or at least remains stable when given more context or information, as would be expected in a robust system.",
  "Self-Check Consistency": "Evaluates whether the model can reliably verify its own answers and maintain consistent responses when asked to double-check its work.",
  "Goal Hijacking and Prompt Leakage: TensorTrust": "Measures the model's resistance to attempts to redirect its behavior toward unintended goals or extract its prompt instructions through carefully crafted inputs.",
  "Prompt Injection: LLM RuLES": "Assesses the model's resilience against prompt injection attacks where malicious instructions are embedded in user inputs to override the model's original instructions.",
  "Jailbreak Attacks": "Evaluates the model's resistance to sophisticated attempts to bypass safety guardrails and make it produce harmful or prohibited content.",
  "Truthful QA": "Measures the model's ability to avoid generating false or misleading information when faced with questions designed to elicit common misconceptions.",
  "Rule Following": "Tests the model's ability to consistently adhere to explicitly stated rules and constraints in its responses, even when prompted to break them."
};

const RobustnessSection = ({ benchmarks, articles }: RobustnessSectionProps) => {
  return (
    <div className="glass-panel rounded-xl p-6 mb-12">
      <h3 className="text-xl font-medium mb-8">Technical Robustness and Safety Evaluation</h3>
      
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableCell className="w-1/3 font-medium text-base">EU AI Act Ethical Principle</TableCell>
            <TableCell className="w-1/3 font-medium text-base">Technical Requirement</TableCell>
            <TableCell className="w-1/3 font-medium text-base">Benchmark Results</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="align-top border-0">
            <TableCell className="py-6 align-top">
              <div className="flex items-start gap-2 mb-3">
                <Shield className="h-6 w-6 text-blue-500 mt-0.5" />
                <h4 className="text-lg font-medium">Technical Robustness and Safety</h4>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 italic">
                "... AI systems are developed and used in a way that allows robustness in case of problems and
                resilience against attempts to alter the use or performance of the AI system so as to allow
                unlawful use by third parties, and minimise unintended harm." - Recital 27
              </p>
              
              <p className="text-sm mb-4">
                The relevant sections of the Act that fall under this ethical principle can be distilled into three technical
                requirements: Robustness and Predictability, Cyberattack Resilience, and Corrigibility.
              </p>
            </TableCell>
            
            <TableCell className="py-6 align-top">
              {/* Robustness and Predictability Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <div className="h-4 w-4 bg-amber-400 rounded-sm rotate-45"></div>
                  </div>
                  <h4 className="text-lg font-medium">Robustness and Predictability</h4>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6">
                  We evaluate the model on state-of-the-art benchmarks that measure its robustness under
                  various input alterations [1], and the level of consistency in its answers [2,3].
                </p>
                
                <div className="space-y-3">
                  {articles.robustness.map((article, index) => (
                    <EuAiActArticleButton
                      key={index}
                      articleNumber={article.article}
                      paragraphNumber={article.paragraph}
                      description={article.description}
                    />
                  ))}
                  <EuAiActArticleButton
                    variant="reference"
                    articleNumber=""
                    paragraphNumber=""
                    description="[1] Ribeiro et al. (2020). Beyond Accuracy: Behavioral Testing of NLP Models with CheckList. ACL.\n[2] Mitchell et al. (2022). Model Cards for Model Reporting. FAccT.\n[3] Jacovi et al. (2021). Formalizing Trust in Artificial Intelligence: Prerequisites, Causes and Goals of Human Trust in AI. FAccT."
                  />
                </div>
              </div>

              {/* Cyberattack Resilience Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <ZapIcon className="h-4 w-4 text-amber-500" />
                  </div>
                  <h4 className="text-lg font-medium">Cyberattack Resilience</h4>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6">
                  We consider the concrete threats concerning just the LLM in isolation, focusing on its resilience to
                  jailbreaks and prompt injection attacks [1,2,3].
                </p>
                
                <div className="space-y-3">
                  {articles.cyberattack.map((article, index) => (
                    <EuAiActArticleButton
                      key={index}
                      articleNumber={article.article}
                      paragraphNumber={article.paragraph}
                      description={article.description}
                    />
                  ))}
                  <EuAiActArticleButton
                    variant="reference"
                    articleNumber=""
                    paragraphNumber=""
                    description="[1] Wei et al. (2023). Jailbroken: How Does LLM Behavior Change When Aligned with Personas that Ignore AI Safety Guidelines?\n[2] Perez et al. (2022). Red Teaming Language Models with Language Models.\n[3] Zou et al. (2023). Universal and Transferable Adversarial Attacks on Aligned Language Models."
                  />
                </div>
              </div>

              {/* Corrigibility Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 flex items-center justify-center">
                    <RefreshCwIcon className="h-4 w-4 text-amber-500" />
                  </div>
                  <h4 className="text-lg font-medium">Corrigibility</h4>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6">
                  While highlighted in the act, corrigibility currently does not have a clear technical definition, scope,
                  and measurable benchmarks, but more importantly, is a system-level concern that depends
                  on various components surrounding the model itself. Thus, we are unable to provide a clear
                  evaluation of this requirement.
                </p>
                
                <div className="space-y-3">
                  {articles.corrigibility.map((article, index) => (
                    <EuAiActArticleButton
                      key={index}
                      articleNumber={article.article}
                      paragraphNumber={article.paragraph}
                      description={article.description}
                    />
                  ))}
                </div>
              </div>
            </TableCell>
            
            <TableCell className="py-6 align-top">
              {/* Robustness and Predictability Benchmarks */}
              <div className="mb-12">
                {benchmarks.robustness.map((benchmark, index) => (
                  <BenchmarkResult
                    key={index}
                    benchmarkName={benchmark.name}
                    modelScore={benchmark.score}
                    comparisonScore={benchmark.comparisonScore}
                    tooltipContent={tooltipExplanations[benchmark.name as keyof typeof tooltipExplanations]}
                  />
                ))}
              </div>

              {/* Cyberattack Resilience Benchmarks */}
              <div className="mb-12">
                {benchmarks.cyberattack.map((benchmark, index) => (
                  <BenchmarkResult
                    key={index}
                    benchmarkName={benchmark.name}
                    modelScore={benchmark.score}
                    comparisonScore={benchmark.comparisonScore}
                    tooltipContent={tooltipExplanations[benchmark.name as keyof typeof tooltipExplanations]}
                  />
                ))}
              </div>

              {/* Corrigibility Benchmarks */}
              <div>
                {benchmarks.corrigibility.map((benchmark, index) => (
                  <BenchmarkResult
                    key={index}
                    benchmarkName={benchmark.name}
                    modelScore={benchmark.score}
                    comparisonScore={benchmark.comparisonScore}
                    tooltipContent={tooltipExplanations[benchmark.name as keyof typeof tooltipExplanations]}
                  />
                ))}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RobustnessSection;
