from app.models import db, User, environment, SCHEMA
from app.models.ingredient import Ingredient
from sqlalchemy.sql import text

def seed_ingredients():
    ingredient_a = Ingredient(
        recipe_id= 1,
        ingredient_name='2 Turkey thighs, brined'
        )
    ingredient_b = Ingredient(
        recipe_id= 1,
        ingredient_name='3 pasilla peppers, dried'
        )
    ingredient_c = Ingredient(
        recipe_id= 1,
        ingredient_name='9 ancho chiles dried'
        )
    ingredient_d = Ingredient(
        recipe_id= 1,
        ingredient_name='2 Bay leaves'
        )
    ingredient_e = Ingredient(
        recipe_id= 1,
        ingredient_name='1/2 garlic bulb'
        )
    ingredient_f = Ingredient(
        recipe_id= 1,
        ingredient_name='1/2 tsp. cumin powder'
        )
    ingredient_g = Ingredient(
        recipe_id= 1,
        ingredient_name='3 cups cooked pinto beans'
        )
    ingredient_h = Ingredient(
        recipe_id= 1,
        ingredient_name='1 small onion diced'
        )
    ingredient_i = Ingredient(
        recipe_id= 1,
        ingredient_name='4 cloves garlic, minced'
        )
    ingredient_j = Ingredient(
        recipe_id= 1,
        ingredient_name='1 poblano pepper, diced'
        )
    ingredient_k = Ingredient(
        recipe_id= 1,
        ingredient_name='1/2 cup pork lard'
        )
    ingredient_l = Ingredient(
        recipe_id= 1,
        ingredient_name='1/4 cup bacon, diced'
        )
    ingredient_m = Ingredient(
        recipe_id= 1,
        ingredient_name='1/2 tsp. epazote, dried'
        )
    ingredient_n = Ingredient(
        recipe_id= 1,
        ingredient_name='Queso fresco'
        )
    ingredient_o = Ingredient(
        recipe_id= 1,
        ingredient_name='Avocado'
        )
    ingredient_p = Ingredient(
        recipe_id= 1,
        ingredient_name='Diced jalapenos'
        )
    ingredient_q = Ingredient(
        recipe_id= 1,
        ingredient_name='Diced tomatoes'
        )
    ingredient_r = Ingredient(
        recipe_id= 1,
        ingredient_name='Cilantro'
        )
    ingredient_s = Ingredient(
        recipe_id= 1,
        ingredient_name='Lime Wedges'
        )
    ingredient_t = Ingredient(
        recipe_id= 1,
        ingredient_name='Hot sauce'
        )


    ingredient_u = Ingredient(
        recipe_id= 2,
        ingredient_name='Salt, to taste'
        )
    ingredient_v = Ingredient(
        recipe_id= 2,
        ingredient_name='1 garlic clove, minced'
        )
    ingredient_w = Ingredient(
        recipe_id= 2,
        ingredient_name='1 tsp. lemon juice'
        )
    ingredient_x = Ingredient(
        recipe_id= 2,
        ingredient_name='5 oz. Greek yogurt'
        )
    ingredient_y = Ingredient(
        recipe_id= 2,
        ingredient_name='Half an English cucumber, grated'
        )
    ingredient_z = Ingredient(
        recipe_id= 2,
        ingredient_name='1/4 tsp. fine sea salt, plus extra'
        )
    ingredient_a1 = Ingredient(
        recipe_id= 2,
        ingredient_name='2 tbsp. olive oil'
        )
    ingredient_b1 = Ingredient(
        recipe_id= 2,
        ingredient_name='1/4 tsp. red pepper flakes'
        )
    ingredient_c1 = Ingredient(
        recipe_id= 2,
        ingredient_name='1/4 tsp. turmeric'
        )
    ingredient_d1 = Ingredient(
        recipe_id= 2,
        ingredient_name='Dash of cinnamon'
        )
    ingredient_e1 = Ingredient(
        recipe_id= 2,
        ingredient_name='1 tsp. smoked paprika'
        )
    ingredient_f1 = Ingredient(
        recipe_id= 2,
        ingredient_name='1 tsp. ground cumin'
        )
    ingredient_g1 = Ingredient(
        recipe_id= 2,
        ingredient_name='1/2 tsp. ground black pepper'
        )
    ingredient_h1 = Ingredient(
        recipe_id= 2,
        ingredient_name='3 cloves of garlic, crushed'
        )
    ingredient_i1 = Ingredient(
        recipe_id= 2,
        ingredient_name='Juice of half a large lemon'
        )
    ingredient_j1 = Ingredient(
        recipe_id= 2,
        ingredient_name='Feta cheese, crumbled'
        )
    ingredient_k1 = Ingredient(
        recipe_id= 2,
        ingredient_name='Red onion, thinly sliced'
        )
    ingredient_l1 = Ingredient(
        recipe_id= 2,
        ingredient_name='Tomato, sliced'
        )
    ingredient_m1 = Ingredient(
        recipe_id= 2,
        ingredient_name='4 Greek pita or naan breads'
        )
    ingredient_n1 = Ingredient(
        recipe_id= 2,
        ingredient_name='12 oz. oyster mushrooms'
        )


    ingredient_o1 = Ingredient(
        recipe_id= 3,
        ingredient_name='6 fresh egg yolks'
        )
    ingredient_p1 = Ingredient(
        recipe_id= 3,
        ingredient_name='1 box Kosher salt'
        )


    ingredient_q1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/2 lb. gizzards, cleaned and sliced'
        )
    ingredient_r1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/2 cup flour'
        )
    ingredient_s1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/4 tsp. salt'
        )
    ingredient_t1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/2 tsp. smoked paprika'
        )
    ingredient_u1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1 egg'
        )
    ingredient_v1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/2 cup milk'
        )
    ingredient_w1 = Ingredient(
        recipe_id= 4,
        ingredient_name='1/4 cup butter'
        )
    ingredient_x1 = Ingredient(
        recipe_id= 4,
        ingredient_name=' 1/4 cup hot sauce'
        )

    db.session.add(ingredient_a)
    db.session.add(ingredient_b)
    db.session.add(ingredient_c)
    db.session.add(ingredient_d)
    db.session.add(ingredient_e)
    db.session.add(ingredient_f)
    db.session.add(ingredient_g)
    db.session.add(ingredient_h)
    db.session.add(ingredient_i)
    db.session.add(ingredient_j)
    db.session.add(ingredient_k)
    db.session.add(ingredient_l)
    db.session.add(ingredient_m)
    db.session.add(ingredient_n)
    db.session.add(ingredient_o)
    db.session.add(ingredient_p)
    db.session.add(ingredient_q)
    db.session.add(ingredient_r)
    db.session.add(ingredient_s)
    db.session.add(ingredient_t)
    db.session.add(ingredient_u)
    db.session.add(ingredient_v)
    db.session.add(ingredient_w)
    db.session.add(ingredient_x)
    db.session.add(ingredient_y)
    db.session.add(ingredient_z)
    db.session.add(ingredient_a1)
    db.session.add(ingredient_b1)
    db.session.add(ingredient_c1)
    db.session.add(ingredient_d1)
    db.session.add(ingredient_e1)
    db.session.add(ingredient_f1)
    db.session.add(ingredient_g1)
    db.session.add(ingredient_h1)
    db.session.add(ingredient_i1)
    db.session.add(ingredient_j1)
    db.session.add(ingredient_k1)
    db.session.add(ingredient_l1)
    db.session.add(ingredient_m1)
    db.session.add(ingredient_n1)
    db.session.add(ingredient_o1)
    db.session.add(ingredient_p1)
    db.session.add(ingredient_q1)
    db.session.add(ingredient_r1)
    db.session.add(ingredient_s1)
    db.session.add(ingredient_t1)
    db.session.add(ingredient_u1)
    db.session.add(ingredient_v1)
    db.session.add(ingredient_w1)
    db.session.add(ingredient_x1)
    db.session.commit()

def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))

    db.session.commit()
