# Computa&ccedil;&atilde;o Gr&aacute;fica [EEL882]
## Aluno: Lucas Santiago Peixoto [DRE: 116023847]
## Professor: Cláudio Esperança
### Trabalho 2 - Ray-Casting em 2D

Instruções:

```
Todas as instruções a seguir devem ser executadas no espaço desenhável, ou seja, a parte com fundo cinza.

O programa possui 3 modos:
  1 Criar Formas: Nesse modo, você pode clicar no espaço desenhável para definir o primeiro vértice de sua forma.
    1.1 Clique único: Um vértice a mais é adicionado à forma.
    1.1 Clique duplo: Cria o último ponto da forma e a finaliza.
    1.2 Tecla 'esc' (Escape): Se pressionada antes da finalização da forma, cancela a criação dela.
      
  2 Criar Raios: Esse modo define uma seta ancorada em um ponto, assim como sua extensão, que é desenhada até o final do espaço desenhável.
    2.1 Clique único: Define o vértice âncora do raio.
    2.2 Segurar o clíque e arrastar: Define a direção e sentido do raio.
    2.3 Liberação do botão: Finaliza o raio.
    2.4 Tecla Escape: Se pressionada antes da finalização do raio, cancela a criação dele.
      
  3 Modo Edição: Nesse modo, pode-se editar as figuras criadas. O círculo que segue o mouse é seu raio de detecção. Sua atuação na edição é explicada nas seções abaixo:
    3.1 Vértices de Formas: O vértice mais próximo do mouse que estiver no seu raio de detecção ficará branco, e poderá ser movido ao clicar nele, segurar, e arrastar o botão do mouse. Quaisquer arestas conectadas a ele continuam conectadas. Ao soltá-lo, ele fica na posição desejada.
    3.2 Vértices de Raios: Funcionam da mesma forma que vértices de formas, porém, vértices de raios levam sua seta junto.
    3.3 Ângulos dos raios: Da mesma forma que um vértice, a ponta da seta ficará branca se puder ser arrastada. Diferentemente deles, ao clicar, segurar, e arrastar a ponta da seta, o ângulo do raio é modificado.
    3.4 Formas: Ao passar com o mouse por cima de uma forma, ela ficará mais opaca, sinalizando que esa será arrastada. Da mesma forma que nos itens anteriores, basta clicar, segurar, e arrastar a forma ao lugar desejado. Se formas se sobreporem, a que estiver por cima (a mais recente) será escolhida.

Para mudar de modos, basta selecionar os botões circulares no topo da página.

OBS: Caso uma forma sobrepor a si mesma, não será possível selecioná-la ou arrastá-la na área sobreposta.
```
