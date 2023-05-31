from app.models import db, User, environment, SCHEMA
from app.models.recipe import Recipe
from sqlalchemy.sql import text

def seed_recipes():
    recipe_a = Recipe(
        owner_id='1',
        recipe_type='entree',
        recipe_title='Turkey Tostada',
        preperation_time=255,
        notes='''A tostada is essentially an open-faced hard taco. Crunchy, spicy, savory, and deliciously messy, this is a fun and easy meal to put together. This wild turkey version is made with turkey thighs that are braised with chiles, cumin, and garlic. Prepare the meat, beans, and fried tortillas ahead of time, and these tostadas come together in minutes.
                I recommend brining the turkey the night before cooking, which will season it evenly and help it retain moisture while it cooks. Once ready to cook, brown the turkey and add it to the crockpot with the remaining ingredients and cook on high. Thighs from a tom will take about 4 hours until they are fork tender, jake thighs will take between 2 to 3 hours. Note: if you plan on cooking the turkey legs as well, separate them from the thighs, and start them 2 to 4 hours before the thighs because they need a head start.
                Aside from the turkey, the base for this delicious dish is a fried corn tortilla. You can buy these in the store, but making your own is the way to go. Take stale corn tortillas and fry them in beef tallow for the best results. Heat your fat up to 350-375°F and fry the tortilla until golden brown, about 1 minute. Drain on a wire rack.
                Next in importance to the tortilla are refried beans. You need something sticky to keep everything from sliding off the tortilla, and refried beans are the answer. I like to make my refried beans with pork lard and venison bacon, but you can use domestic bacon or any salty smoked meat. Other than that, it's your tostada—layer it up with your favorite fixins. I like to top mine up with avocado, jalapenos, tomato, cilantro, and queso fresco. I finish it all off with some lime juice and hot sauce.'''
    )
    recipe_b = Recipe(
        owner_id='2',
        recipe_type='entree',
        recipe_title='Oyster Mushroom Gyros',
        preperation_time=90,
        notes='''
            The season for oyster mushrooms can be long. We typically find them in spring and fall in Nebraska, when temperatures warm after winter and the weather begins to cool down again in the fall.
            Wild oyster mushrooms are always found on logs and dead timber and are usually pearl white, light brown, or gray. Interestingly, cultivated oyster mushrooms can come in a wide range of colors, such as blue, yellow, and even salmon pink. Underneath, oyster mushrooms show decurrent gills that run directly down to their stems.
            For a satisfying, yet vegetarian meal, try this oyster mushroom gyro recipe. It"s super easy to pull together. Oyster mushrooms are so meaty that you won"t miss the meat.
        '''
    )
    recipe_c = Recipe(
        owner_id='3',
        recipe_type='side',
        recipe_title='Salt-Cured Egg Yolks',
        preperation_time=20160,
        notes='''
            If you"re lucky enough to have a flock of hens—at some point, in spring or summer, when they"re really laying, the day will come when you think you might be tired of eating eggs. Salt-cured yolks will revive you. The yolk is the only part of the egg that matters to the tongue, the whites serve mostly to protect this orb of flavor, in my opinion.
            Salt-curing turns the volume up on everything we love about the essence of yolk and transforms the texture so that we can enjoy it on everything. Salt-curing yolks is the most fool-proof of cures, so it"s a great place to start if you"re interested but intimidated by the curing process—all it takes is salt, yolks, and two weeks" time.
            When they"re done, you"ll have rich, salty, probiotic umami bombs to shave, grate, or slice onto pasta, toast, salad, beans, grilled meats, roasted vegetables, or more eggs. Think of it as your dairy-free parmesan, your fish-free bottarga, and your new favorite way to eat eggs.
        '''
    )
    recipe_d = Recipe(
        owner_id='1',
        recipe_type='side',
        recipe_title='Fried Gizzard',
        preperation_time='60',
        notes='''
            Gizzards seem to be a love-it or hate-it protein. To me, they"re a lot like hearts—hard-working muscle, dense with flavor. But unlike hearts, they"re extra chewy. There are a few approaches to cooking gizzards; the method you choose will depend on your end goal and jaw strength. You can tenderize them, or you can embrace the chewiness and cook them straight up.;
            This fried gizzard recipe has an optional step for tenderizing, which honestly will make it more palatable for the majority of eaters. But if you"re one of those weirdos like me that likes extra chewy and crunchy food, you can skip that step, which inevitably will mean fewer gizzards that you have to share.;\
            First, clean the gizzards. You want to remove the plate and the silver skin from the sides of each half. Give them a good rinse to get rid of any gravelly bits. With duck gizzards, you can just split them in half, but with goose or turkey gizzards, cut them down into ¼-inch thick, bite-size pieces. Here"s a helpful video on cleaning gizzards as well.
        '''
    )
    # recipe_e = Recipe(
    #     owner_id='2',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes=''
    # )
    # recipe_f = Recipe(
    #     owner_id='3',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes=''
    # )
    # recipe_g = Recipe(
    #     owner_id='',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes=''
    # )
    # recipe_h = Recipe(
    #     owner_id='1',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes='',
    #     ingredients='',
    #     instructions=''
    # )
    # recipe_i = Recipe(
    #     owner_id='2',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes='',
    #     ingredients='',
    #     instructions=''
    # )
    # recipe_j = Recipe(
    #     owner_id='3',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes='',
    #     ingredients='',
    #     instructions=''
    # )
    # recipe_k = Recipe(
    #     owner_id='1',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes='',
    #     ingredients='',
    #     instructions=''
    # )
    # recipe_l = Recipe(
    #     owner_id='2',
    #     recipe_type='',
    #     recipe_title='',
    #     preperation_time='',
    #     notes='',
    #     ingredients='',
    #     instructions=''
    # )

    db.session.add(recipe_a)
    db.session.add(recipe_b)
    db.session.add(recipe_c)
    db.session.add(recipe_d)
    # db.session.add(recipe_e)
    # db.session.add(recipe_f)
    # db.session.add(recipe_g)
    # db.session.add(recipe_h)
    # db.session.add(recipe_i)
    # db.session.add(recipe_j)
    # db.session.add(recipe_k)
    # db.session.add(recipe_l)
    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
