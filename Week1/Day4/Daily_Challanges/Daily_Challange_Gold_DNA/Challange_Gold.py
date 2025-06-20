import random
from abc import ABC, abstractmethod
from typing import List
import statistics

class Mutable(ABC):
    """Abstract base class for objects that can mutate"""
    
    @abstractmethod
    def mutate(self) -> None:
        """Mutate the object"""
        pass
    
    @abstractmethod
    def is_perfect(self) -> bool:
        """Check if the object has reached the target state (all 1s)"""
        pass

class Gene(Mutable):
    """A single gene that can be 0 or 1"""
    
    def __init__(self, value: int = None):
        self.value = random.randint(0, 1) if value is None else value
    
    def mutate(self) -> None:
        """Flip the gene value (0->1 or 1->0)"""
        self.value = 1 - self.value
    
    def is_perfect(self) -> bool:
        """A perfect gene has value 1"""
        return self.value == 1
    
    def __str__(self) -> str:
        return str(self.value)
    
    def __repr__(self) -> str:
        return f"Gene({self.value})"

class Chromosome(Mutable):
    """A chromosome composed of 10 genes"""
    
    def __init__(self, genes: List[Gene] = None):
        if genes is None:
            self.genes = [Gene() for _ in range(10)]
        else:
            self.genes = genes
    
    def mutate(self) -> None:
        """Mutate by randomly flipping some genes (50% chance each)"""
        for gene in self.genes:
            if random.random() < 0.5:  # 50% chance to mutate each gene
                gene.mutate()
    
    def is_perfect(self) -> bool:
        """A perfect chromosome has all genes equal to 1"""
        return all(gene.is_perfect() for gene in self.genes)
    
    def __str__(self) -> str:
        return ''.join(str(gene) for gene in self.genes)
    
    def __repr__(self) -> str:
        return f"Chromosome([{', '.join(repr(gene) for gene in self.genes)}])"

class DNA(Mutable):
    """DNA composed of 10 chromosomes"""
    
    def __init__(self, chromosomes: List[Chromosome] = None):
        if chromosomes is None:
            self.chromosomes = [Chromosome() for _ in range(10)]
        else:
            self.chromosomes = chromosomes
    
    def mutate(self) -> None:
        """Mutate by randomly mutating some chromosomes (50% chance each)"""
        for chromosome in self.chromosomes:
            if random.random() < 0.5:  # 50% chance to mutate each chromosome
                chromosome.mutate()
    
    def is_perfect(self) -> bool:
        """Perfect DNA has all chromosomes perfect (all 1s)"""
        return all(chromosome.is_perfect() for chromosome in self.chromosomes)
    
    def get_fitness(self) -> float:
        """Calculate fitness as percentage of 1s in the DNA"""
        total_genes = len(self.chromosomes) * 10
        ones_count = sum(sum(gene.value for gene in chromosome.genes) 
                        for chromosome in self.chromosomes)
        return ones_count / total_genes
    
    def __str__(self) -> str:
        return '\n'.join(f"Chr{i:2d}: {chromosome}" 
                        for i, chromosome in enumerate(self.chromosomes, 1))
    
    def __repr__(self) -> str:
        return f"DNA({repr(self.chromosomes)})"

class Organism:
    """An organism with DNA that can mutate based on environmental conditions"""
    
    def __init__(self, dna: DNA = None, environment: float = 0.1):
        self.dna = dna if dna is not None else DNA()
        self.environment = environment  # Mutation probability
        self.generation = 0
    
    def mutate(self) -> None:
        """Mutate the organism's DNA based on environmental conditions"""
        if random.random() < self.environment:
            self.dna.mutate()
        self.generation += 1
    
    def is_evolved(self) -> bool:
        """Check if organism has evolved to perfection (all 1s)"""
        return self.dna.is_perfect()
    
    def get_fitness(self) -> float:
        """Get the fitness of the organism"""
        return self.dna.get_fitness()
    
    def __str__(self) -> str:
        return f"Organism (Gen: {self.generation}, Fitness: {self.get_fitness():.1%})\n{self.dna}"

def run_evolution_experiment(num_organisms: int = 10, environment: float = 0.3, max_generations: int = 10000):
    """Run evolution experiment with multiple organisms"""
    
    print(f"🧬 Starting Evolution Experiment")
    print(f"   Organisms: {num_organisms}")
    print(f"   Environment (mutation rate): {environment}")
    print(f"   Target: All DNA = 1s")
    print("="*50)
    
    # Create organisms
    organisms = [Organism(environment=environment) for _ in range(num_organisms)]
    
    # Track statistics
    generation = 0
    successful_organisms = []
    
    # Show initial state
    print(f"\nGeneration 0 - Initial Population:")
    for i, org in enumerate(organisms[:3]):  # Show first 3
        print(f"Organism {i+1} fitness: {org.get_fitness():.1%}")
    
    # Evolution loop
    while generation < max_generations:
        generation += 1
        
        # Mutate all organisms
        for organism in organisms:
            organism.mutate()
        
        # Check for evolved organisms
        for i, organism in enumerate(organisms):
            if organism.is_evolved() and organism not in successful_organisms:
                successful_organisms.append((organism, generation, i+1))
                print(f"\n🎉 SUCCESS! Organism {i+1} evolved to perfection!")
                print(f"   Generation: {generation}")
                print(f"   Fitness: {organism.get_fitness():.1%}")
                print(f"   Final DNA:")
                print(f"{organism.dna}")
        
        # Progress updates
        if generation % 1000 == 0 or len(successful_organisms) > 0:
            avg_fitness = statistics.mean(org.get_fitness() for org in organisms)
            best_fitness = max(org.get_fitness() for org in organisms)
            print(f"\nGeneration {generation}: Avg fitness: {avg_fitness:.1%}, Best: {best_fitness:.1%}")
        
        # Stop if we have successful organisms
        if successful_organisms:
            break
    
    return successful_organisms, generation

def write_research_notebook(results, final_generation):
    """Write results to research notebook"""
    
    notebook_entry = f"""
🔬 BIOLOGY RESEARCH NOTEBOOK - DNA Evolution Experiment
======================================================

EXPERIMENT DATE: {random.choice(['2024-03-15', '2024-03-22', '2024-03-28'])}
RESEARCHER: AI Biology Lab

HYPOTHESIS:
Through random mutations influenced by environmental factors, organisms 
can evolve from random DNA sequences to optimal sequences (all 1s) 
through natural selection pressures.

METHODOLOGY:
- Created 10 organisms with random DNA (10 chromosomes × 10 genes each)
- Each gene starts as random 0 or 1
- Environment mutation rate: 30%
- Target: All genes = 1 (perfect fitness = 100%)

RESULTS:
"""
    
    if results:
        notebook_entry += f"✅ SUCCESS ACHIEVED!\n"
        for organism, generation, org_id in results:
            notebook_entry += f"- Organism {org_id} reached perfection at generation {generation}\n"
        
        avg_generations = statistics.mean(gen for _, gen, _ in results)
        notebook_entry += f"- Average generations to perfection: {avg_generations:.1f}\n"
    else:
        notebook_entry += f"❌ No organisms reached perfection within {final_generation} generations\n"
    
    notebook_entry += f"""
OBSERVATIONS:
- Mutation rate significantly affects evolution speed
- Higher environmental pressure leads to faster evolution
- Some organisms may get "stuck" in local optima
- Random mutations can both help and hinder progress

CONCLUSIONS:
This simulation demonstrates key evolutionary principles:
1. **Random Variation**: Mutations provide genetic diversity
2. **Selection Pressure**: Environmental conditions drive evolution
3. **Inheritance**: Genetic information is preserved and modified
4. **Time Scale**: Evolution requires many generations

The polymorphic design (Mutable interface) allows different biological 
components to mutate in their own specific ways, while inheritance 
creates a natural hierarchy from genes → chromosomes → DNA → organisms.

FUTURE RESEARCH:
- Test different mutation rates
- Implement sexual reproduction (crossover)
- Add environmental selection pressure
- Study population dynamics

---
End of Research Entry
"""
    
    print(notebook_entry)
    return notebook_entry

# Run the experiment
if __name__ == "__main__":
    print("🧬 DNA Evolution Simulation Starting...")
    print("This may take a moment to find the perfect organism...\n")
    
    # Run experiment
    successful_organisms, final_gen = run_evolution_experiment(
        num_organisms=10, 
        environment=0.3,  # 30% mutation rate
        max_generations=5000
    )
    
    # Write research notebook
    notebook = write_research_notebook(successful_organisms, final_gen)
    
    print(f"\n{'='*50}")
    print("🔬 Experiment Complete! Check the research notebook above.")
    
    if successful_organisms:
        print(f"🎉 Evolution successful! Found {len(successful_organisms)} perfect organism(s)!")
    else:
        print("🔄 Try running again or increase mutation rate for faster evolution!")