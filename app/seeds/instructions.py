from app.models import db, User, environment, SCHEMA
from app.models.instruction import Instruction
from sqlalchemy.sql import text

def seed_instructions():
    instruction_a = Instruction(
        recipe_id= 1,
        step_number= 1,
        step_text="Season the turkey thighs with salt and pepper and brown both sides over medium-high heat, about 2 minutes per side. Place thighs in a crockpot with peppers, bay leaf, garlic, and cumin. Add water until almost covered. Set to high and cook for about 4 hours or until fork tender."
    )
    instruction_b = Instruction(
        recipe_id= 1,
        step_number= 2,
        step_text="While the meat is cooking, prepare your refried beans. Sweat the onions, garlic, and peppers in a saucepan over medium-low heat with the pork lard and bacon until fragrant and onions are semi-translucent (about 5 to 6 minutes). Add in beans and epazote, and cook for another 5 minutes. Smash with a potato masher until it has a paste-like consistency. The beans may seem runny, but they will thicken as they cool. Taste and season heavily with salt and pepper."
    )
    instruction_c = Instruction(
        recipe_id= 1,
        step_number= 3,
        step_text="Once thighs are tender, remove from liquid and shred with a fork."
    )
    instruction_d = Instruction(
        recipe_id= 1,
        step_number= 4,
        step_text="Build your tostada. Smear refried beans on your fried corn tortilla and pile high with queso fresco, shredded turkey meat, cilantro, avocado, jalapeno, tomatoes, and your favorite hot sauce."
    )


    instruction_e = Instruction(
        recipe_id= 2,
        step_number= 1,
        step_text="In a large bowl, whisk marinade ingredients until fat is fully incorporated. Add oyster mushrooms and coat evenly. Cover and refrigerate for 1 hour."
    )
    instruction_f = Instruction(
        recipe_id= 2,
        step_number= 2,
        step_text="To make the tzatziki sauce, squeeze grated cucumber of excess moisture. Then stir with remaining ingredients in a small bowl and keep cold until ready to serve."
    )
    instruction_g = Instruction(
        recipe_id= 2,
        step_number= 3,
        step_text="Preheat oven to 400°F. Line a baking sheet with foil before placing the mushrooms on. Tear or cut the mushrooms into smaller pieces, if desired. Bake for 15 to 20 minutes, or until mushrooms are cooked through and become crispy at the edges. Season to taste with salt."
    )
    instruction_h = Instruction(
        recipe_id= 2,
        step_number= 4,
        step_text="Heat pita/naan on a cookie sheet at 400°F for 2 minutes, to make them more pliable. Then fill with tzatziki sauce, roasted mushrooms, tomato, red onion, and feta cheese. Serve immediately."
    )


    instruction_i = Instruction(
        recipe_id= 3,
        step_number= 1,
        step_text="Pour enough Kosher salt into your non-reactive container to cover that bottom evenly with ½ inch."
    )
    instruction_j = Instruction(
        recipe_id= 3,
        step_number= 2,
        step_text="Take one egg, in the shell, and use the fat bottom end to make six depressions in the surface of the salt for the yolks to sit in."
    )
    instruction_k = Instruction(
        recipe_id= 3,
        step_number= 3,
        step_text="Crack your eggs, separate your whites into a container to use elsewhere, and gently tip the yolks into the prepared salt."
    )
    instruction_l = Instruction(
        recipe_id= 3,
        step_number= 4,
        step_text="Gently pour more salt over the yolks until they are covered by a thick enough layer that you cannot see their color showing through."
    )
    instruction_m = Instruction(
        recipe_id= 3,
        step_number= 5,
        step_text="Put a lid on your container or cover it in plastic wrap and place on a flat shelf in the fridge for one week."
    )
    instruction_n = Instruction(
        recipe_id= 3,
        step_number= 6,
        step_text="After one week, unwind about 18 inches of clean cheesecloth from its board and lay flat. You do not need to unfold width-wise."
    )
    instruction_o = Instruction(
        recipe_id= 3,
        step_number= 7,
        step_text="Remove the yolks gently from the salt, gently from the bottom with a finger. The very outer layer will still be a little jammy but overall, the yolk should feel firm."
    )
    instruction_p = Instruction(
        recipe_id= 3,
        step_number= 8,
        step_text="Brush all of the clinging salt off of each yolk, press back into a tidy circle with your fingers, and place on the length of cheesecloth, evenly spaced."
    )
    instruction_q = Instruction(
        recipe_id= 3,
        step_number= 9,
        step_text="Fold both sides of the cloth over the yolks and tie a section of string in between each yolk and at both ends."
    )
    instruction_r = Instruction(
        recipe_id= 3,
        step_number= 10,
        step_text="Hang this chain of yolks somewhere cold and dry, like the fridge or a cool clean corner of the pantry (below 50°F) for another 5 to 7 days until the yolks are dried. They should no longer be sticky and soft on the outside, the rest of the clinging salt should brush away easily, and the yolk should grate like a semi-hard cheese rather than smearing on a Microplane."
    )
    instruction_s = Instruction(
        recipe_id= 3,
        step_number= 11,
        step_text="Store the yolks in the cheesecloth inside a covered container in the fridge for up to a month. I recommend making another batch as soon as one is finished drying."
    )


    instruction_t = Instruction(
        recipe_id= 4,
        step_number= 1,
        step_text="If braising the gizzards, follow this step; if not, skip straight to the next step. Place the sliced gizzards in a crock pot or dutch oven, cover them with water, and add some salt and aromatics if you want. I toss a few bay leaves and some garlic in there. Set the crock pot on high and cook for 2 to 4 hours, or until tender. If using a dutch oven, cover with a lid and place in an oven set at 350°F for 2 to 4 hours. Once tender enough to your liking, drain and allow to cool enough to handle."
    )
    instruction_u = Instruction(
        recipe_id= 4,
        step_number= 2,
        step_text="Make the buffalo sauce by melting butter in a small saucepan over low heat. Once melted, remove from heat and whisk in hot sauce until combined."
    )
    instruction_v = Instruction(
        recipe_id= 4,
        step_number= 3,
        step_text="Prepare the breading and egg wash by whisking the dry ingredients together in one bowl and the wet ingredients together in another bowl."
    )
    instruction_w = Instruction(
        recipe_id= 4,
        step_number= 4,
        step_text="Season the gizzards with salt and pepper, then toss them in the breading. Shake off excess breading, and dip them into the egg wash, then back into the breading. This second layer of breading will give them that extra crispy fried chicken texture. Shake off the excess breading, and they are ready for the deep fryer."
    )
    instruction_x = Instruction(
        recipe_id= 4,
        step_number= 5,
        step_text="Heat your frying oil to 350 to 375°F and fry the breaded gizzards for about 2 minutes, or until they are golden brown. If you choose to braise the gizzards before frying, they're already cooked through, and this frying stage is just to cook the breading. Either way, you're looking for a nice, even, golden brown color."
    )
    instruction_y = Instruction(
        recipe_id= 4,
        step_number= 6,
        step_text="Remove from the oil with a slotted spoon and place on a paper towel-lined pan. Serve with your favorite fried food sauces. I like mine with buffalo sauce, extra thick ranch, and celery sticks."
    )


    # instruction_z = Instruction(
    #     recipe_id= ,
    #     step_number= ,
    #     step_text=
    # )

    db.session.add(instruction_a)
    db.session.add(instruction_b)
    db.session.add(instruction_c)
    db.session.add(instruction_d)
    db.session.add(instruction_e)
    db.session.add(instruction_f)
    db.session.add(instruction_g)
    db.session.add(instruction_h)
    db.session.add(instruction_i)
    db.session.add(instruction_j)
    db.session.add(instruction_k)
    db.session.add(instruction_l)
    db.session.add(instruction_m)
    db.session.add(instruction_n)
    db.session.add(instruction_o)
    db.session.add(instruction_p)
    db.session.add(instruction_q)
    db.session.add(instruction_r)
    db.session.add(instruction_s)
    db.session.add(instruction_t)
    db.session.add(instruction_u)
    db.session.add(instruction_v)
    db.session.add(instruction_w)
    db.session.add(instruction_x)
    db.session.add(instruction_y)
    # db.session.add(instruction_z)
    db.session.commit()

def undo_instructions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.instructions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(("DELETE FROM instructions"))

    db.session.commit()
