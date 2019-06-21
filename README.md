# Computa&ccedil;&atilde;o Gr&aacute;fica [EEL882]
## Aluno: Lucas Santiago Peixoto [DRE: 116038999]
## Professor: Cl&aacute;udio Esperan&ccedil;a&nbsp;
&nbsp;
### Trabalho 2 - Ray-Casting em 2D (assignment-1)
#### Instru&ccedil;&otilde;es:

Todas as instruções a seguir devem ser executadas no espaço desenhável, ou seja, a parte com fundo cinza.

O programa possui 3 modos:
1. **Criar Formas**: Nesse modo, você pode clicar no espaço desenhável para definir o primeiro vértice de sua forma.
    * *Clique único*: Um vértice a mais é adicionado à forma.
    * *Clique duplo*: Cria o último ponto da forma e a finaliza.
    * *Tecla 'esc' (Escape)*: Se pressionada antes da finalização da forma, cancela a criação dela.
      
2. **Criar Raios**: Esse modo define uma seta ancorada em um ponto, assim como sua extensão, que é desenhada até o final do espaço desenhável.
    * *Clique único*: Define o vértice âncora do raio.
    * *Segurar o clíque e arrastar*: Define a direção e sentido do raio.
    * *Liberação do botão*: Finaliza o raio.
    * *Tecla Escape*: Se pressionada antes da finalização do raio, cancela a criação dele.
      
3. **Modo Edição**: Nesse modo, pode-se editar as figuras criadas. O círculo que segue o mouse é seu raio de detecção. Sua atuação na edição é explicada nas seções abaixo:
    * *Vértices de Formas*: O vértice mais próximo do mouse que estiver no seu raio de detecção ficará branco, e poderá ser movido ao *clicar nele, segurar, e arrastar* o botão do mouse. Quaisquer arestas conectadas a ele continuam conectadas. Ao *soltar o botão do mouse*, ele fica na posição desejada.
    * *Vértices de Raios*: Funcionam da mesma forma que vértices de formas, porém, vértices de raios levam sua seta junto.
    * *Ângulos dos raios*: Da mesma forma que um vértice, a ponta da seta ficará branca se puder ser arrastada. Diferentemente deles, ao *clicar, segurar, e arrastar* a ponta da seta, o ângulo do raio é modificado.
    * *Formas*: Ao *passar com o mouse* por cima de uma forma, ela ficará mais opaca, sinalizando que esa será arrastada. Da mesma forma que nos itens anteriores, basta *clicar, segurar, e arrastar* a forma ao lugar desejado. Se formas se sobreporem, a que estiver por cima (a mais recente) será escolhida.

Para mudar de modos, basta selecionar os botões circulares no topo da página.

OBS: Caso uma forma sobrepor a si mesma, não será possível selecioná-la ou arrastá-la na área sobreposta.

&nbsp;
### Trabalho 3 - Manipula&ccedil;&atilde;o de Objetos com three.JS (assignment-2)

#### Instruções:

Todas as instruções a seguir devem ser executadas no espaço desenhável, ou seja, a parte com fundo cinza.

O programa possui dois modos, e um comutador entre esses modos:

1. **Translação de Objetos**: Nesse modo, pode-se mover um objeto *clicando e segurando o botão esquerdo do mouse* sobre tal objeto, e *arrastando o cursor do mouse* para qualquer ponto da tela.
    * Neste modo também pode-se aplicar um *zoom* na câmera, *girando a roda de scroll do mouse*. 

2. **Rotação de Objeto/Objetos**: Nesse modo, será apresentada uma esfera envolvendo o objeto/grupo de objetos que serão rotacionados. Para rotacioná-los em torno do centro dessa esfera, basta *clicar e segurar o botão esquerdo do mouse* sobre a esfera, e *arrastar o cursor do mouse* para qualquer ponto da tela.

3. **Comutador**: Para trocar de modo, basta efetuar um *duplo clique com o botão esquerdo do mouse*.
    * Se essa ação for efetuada sobre um objeto, a rotação será feita *apenas no objeto selecionado*.
    * Se essa ação for efetuada sobre a tela, a rotação será feita no *grupo de objetos*.
