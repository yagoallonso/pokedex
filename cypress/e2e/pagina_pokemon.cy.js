describe('Testar a busca de Pokémon usando fixture', () => {
    beforeEach(() => {
      cy.fixture('pokemons').as('pokemonData');
      cy.visit('https://react-pokemon.pages.dev/');
    });
  
    it('Deve buscar cada Pokémon da lista por nome e verificar ataque e defesa', function() {
      this.pokemonData.forEach((pokemon) => {
        cy.get('.w-full').clear().type(pokemon.nome);
        cy.contains('Buscar').click();
  
        cy.get('.bg-primary .p-2 > h2.font-bold.capitalize')
          .should('contain.text', pokemon.nome);
  
        cy.get('.bg-primary .px-2.pt-2 > p')
          .eq(0)
          .should('contain.text', `Ataque: ${pokemon.ataque}`);
        cy.get('.bg-primary .px-2.pt-2 > p')
          .eq(1)
          .should('contain.text', `Defesa: ${pokemon.defesa}`);
  
        cy.contains('Limpar').click();
      });
    });
  
    it('Deve buscar cada Pokémon da lista por número e verificar ataque e defesa', function() {
      this.pokemonData.forEach((pokemon) => {
        cy.get('.w-full').clear().type(pokemon.numero);
        cy.contains('Buscar').click();
  
        cy.get('.bg-primary .p-2 > h2.font-bold.capitalize')
          .should('contain.text', pokemon.nome);
  
        cy.get('.bg-primary .px-2.pt-2 > p')
          .eq(0)
          .should('contain.text', `Ataque: ${pokemon.ataque}`);
        cy.get('.bg-primary .px-2.pt-2 > p')
          .eq(1)
          .should('contain.text', `Defesa: ${pokemon.defesa}`);
  
        cy.contains('Limpar').click();
      });
    });
  
    it('Deve buscar Pokémon não existente', function() {
      cy.get('.w-full').clear().type('xyzmon');
      cy.contains('Buscar').click();
      cy.get('.p-4 > .grid > .flex').should('contain', "Nenhum item existente.");
  
      cy.contains('Limpar').click();
      cy.get('.h-screen-minus-56 > .grid').should('be.visible');
    });
  
    it('Deve verificar ataque e defesa na Página detalhe do Pokémon', function() {
      const pokemon = this.pokemonData[2];
  
      cy.get(':nth-child(1) > .p-4 > .justify-center > .bg-primary').click();
  
      cy.get('.bg-primary .p-2 > h2.font-bold.capitalize')
        .should('contain.text', pokemon.nome);
  
      cy.get('.bg-primary .px-2.pt-2 > p')
        .eq(0)
        .should('contain.text', `Ataque: ${pokemon.ataque}`);
      cy.get('.bg-primary .px-2.pt-2 > p')
        .eq(1)
        .should('contain.text', `Defesa: ${pokemon.defesa}`);
    });
  
    it('Deve verificar a funcionalidade de paginação com carregamento dinâmico', function() {
      cy.get('.h-screen-minus-56 > .grid').then(($list) => {
        const initialContent = $list.text();
  
        cy.get('.flex > :nth-child(8)').click();
        cy.get('.h-screen-minus-56 > .grid').should(($newList) => {
          const newContent = $newList.text();
          expect(newContent).not.to.equal(initialContent);
        });
      });
    });
  });