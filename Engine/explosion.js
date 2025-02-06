class Fragment extends Circle
{
    constructor(sc, C_Trans2D, c)
    {
        super(C_Trans2D, c);

        this.lifespan = Math.random()+1;
        this.sc = sc;
        this.type = "frag";
        this.v = new Vec2(Math.random()-0.5, Math.random()-0.5).normalized().scalar(Math.random()*512+this.t.radius*16);
        this.c = randomColor()

        sc.add(this);
    }

    explode(sc)
    {
        sc.deleteItem(this);
    }

    update(dt)
    {
        this.v = this.v.scalar(0.995);
        this.t.pos = this.t.pos.add(this.v.scalar(dt));

        if (this.collide) this.updateBounds();

        this.lifespan -= dt;

        if (this.lifespan <= 0.5 && this.lifespan > 0)
        {
            this.alpha = this.lifespan/0.5;
        }
        
        if (this.lifespan <= 0)
        {
            this.explode(this.sc);
        }
    }
}

function SpawnExplosion(sc, origin, mass)
{
    const fragmentCount = Math.random()*16+16;
    let frags = [];
    for (let i = 0; i < fragmentCount; i++)
    {
        frags.push( new Fragment(sc, new C_Transform2D(origin, mass/(Math.random()*4+4)), "white") );
    }
}