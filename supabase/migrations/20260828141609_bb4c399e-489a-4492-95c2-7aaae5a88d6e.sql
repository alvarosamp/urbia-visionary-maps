CREATE TABLE public.celulas (
  h3 text PRIMARY KEY,
  bairro text NOT NULL,
  score integer NOT NULL,
  acessibilidade integer NOT NULL,
  liquidez integer NOT NULL,
  potencial integer NOT NULL,
  infraestrutura integer NOT NULL,
  ndvi numeric NOT NULL,
  ndbi numeric NOT NULL,
  risco integer NOT NULL,
  preco_m2 integer NOT NULL,
  zoneamento text NOT NULL,
  coef_aproveitamento numeric NOT NULL,
  domicilios integer NOT NULL,
  populacao integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.celulas TO anon;
GRANT SELECT ON public.celulas TO authenticated;
GRANT ALL ON public.celulas TO service_role;
ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Celulas publicas para leitura" ON public.celulas FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text,
  email text,
  perfil text NOT NULL DEFAULT 'investidor',
  organizacao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Le o proprio perfil" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Cria o proprio perfil" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Atualiza o proprio perfil" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.areas_salvas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  h3 text NOT NULL REFERENCES public.celulas(h3) ON DELETE CASCADE,
  nota text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, h3)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.areas_salvas TO authenticated;
GRANT ALL ON public.areas_salvas TO service_role;
ALTER TABLE public.areas_salvas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Le as proprias areas" ON public.areas_salvas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Salva areas" ON public.areas_salvas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Atualiza areas" ON public.areas_salvas FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Remove areas" ON public.areas_salvas FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'nome', NEW.raw_user_meta_data ->> 'full_name'), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.celulas (h3, bairro, score, acessibilidade, liquidez, potencial, infraestrutura, ndvi, ndbi, risco, preco_m2, zoneamento, coef_aproveitamento, domicilios, populacao) VALUES
('88a8aca143fffff','Jardim Alvorada',74,96,97,54,80,0.24,0.36,67,4375,'ZEIS',1.8,1942,5247),('88a8aca141fffff','Cidade Jardim',76,78,88,94,73,0.22,0.29,77,5175,'ZR-2',1.3,1854,5349),('88a8aca147fffff','Foch',73,84,77,76,80,0.19,0.35,91,3906,'ZC-1',2.1,191,1577),('88a8aca109fffff','São João',65,82,91,45,77,0.25,0.3,44,4092,'ZR-2',2.5,1400,3044),('88a8aca155fffff','Pinheirinho',71,86,81,54,93,0.25,0.29,72,4205,'ZEIS',2.1,1945,5045),('88a8aca15dfffff','São Geraldo',63,90,87,39,77,0.16,0.31,33,5071,'ZC-1',2.3,467,5017),('88a8aca14bfffff','São João',66,82,78,65,78,0.2,0.28,32,4492,'ZI-1',3.8,1927,5595),('88a8aca149fffff','Pinheirinho',75,79,84,94,79,0.19,0.23,62,4397,'ZR-2',3.4,1965,898),('88a8aca14dfffff','Santa Rita',72,78,75,89,83,0.22,0.19,60,4108,'ZC-1',1.4,581,4736),('88a8aca145fffff','São João',67,85,78,58,72,0.25,0.3,60,4182,'ZI-1',2.6,1119,5403),('88a8aca16bfffff','Santa Rita',71,81,70,79,75,0.24,0.16,90,4271,'ZM-3',3.2,1853,5976),('88a8aca10dfffff','Primavera',65,74,65,67,80,0.32,0.2,56,3907,'ZC-1',3.3,1843,4007),('88a8aca101fffff','Cidade Jardim',77,86,70,90,85,0.28,0.19,95,3677,'ZR-2',3.3,2055,3288),('88a8aca10bfffff','Pinheirinho',66,86,77,57,73,0.24,0.3,47,4081,'ZC-1',3.8,332,5833),('88a8aca157fffff','Foch',63,79,64,40,81,0.31,0.24,80,4645,'ZM-3',1.4,1740,499),('88a8aca151fffff','Primavera',72,89,70,74,71,0.23,0.28,93,4106,'ZM-3',1.2,1984,890),('88a8aca159fffff','Santa Rita',67,80,75,81,69,0.21,0.26,37,4843,'ZM-3',2.5,2195,4661),('88a8aca337fffff','Jardim Alvorada',65,86,91,45,81,0.2,0.28,30,4200,'ZM-3',1.8,1472,3532),('88a8aca335fffff','Cidade Jardim',69,79,83,61,78,0.2,0.28,78,3878,'ZPA',3.8,1209,5754),('88a8aca323fffff','Santa Rita',58,81,68,35,74,0.24,0.19,50,4657,'ZI-1',1.2,2142,6094),('88a8aca327fffff','Centro',58,76,70,33,81,0.24,0.16,44,4120,'ZC-1',1.5,186,3536),('88a8acb89bfffff','Jardim Alvorada',62,74,61,46,67,0.38,0.15,91,3402,'ZEIS',2.5,330,1913),('88a8acb893fffff','Santa Rita',57,71,71,33,80,0.25,0.22,48,3738,'ZI-1',3.7,1712,2389),('88a8aca169fffff','São João',66,66,80,82,64,0.27,0.15,58,3416,'ZI-1',2.0,1298,5851),('88a8aca161fffff','Belo Horizonte',65,66,76,64,72,0.29,0.21,83,3703,'ZI-1',2.7,2113,3698),('88a8aca163fffff','Cidade Jardim',64,72,68,53,79,0.34,0.16,80,4025,'ZPA',3.2,2238,863),('88a8aca105fffff','Santa Rita',64,65,76,86,63,0.28,0.14,31,3895,'ZC-1',3.8,1300,3495),('88a8aca107fffff','São Geraldo',60,67,71,58,59,0.31,0.24,67,3969,'ZC-1',1.6,705,1466),('88a8aca103fffff','Foch',64,74,82,41,77,0.27,0.22,83,4867,'ZM-3',2.9,879,3119),('88a8aca11dfffff','São João',61,83,71,47,70,0.27,0.18,39,4737,'ZR-2',1.1,2149,4753),('88a8aca119fffff','São João',59,77,63,37,66,0.31,0.19,83,3618,'ZPA',1.1,1359,4878),('88a8aca153fffff','Santa Rita',63,73,77,37,82,0.24,0.18,84,4329,'ZC-1',2.5,320,3423),('88a8aca15bfffff','Pinheirinho',57,75,80,31,69,0.22,0.22,43,4651,'ZC-1',2.4,1285,4439),('88a8aca065fffff','Primavera',66,70,65,82,71,0.26,0.22,59,4604,'ZM-3',2.4,541,531),('88a8aca333fffff','São João',61,78,74,26,81,0.3,0.23,80,4716,'ZPA',3.7,1147,4730),('88a8aca331fffff','Santa Rita',61,85,65,31,81,0.23,0.24,80,5001,'ZM-3',2.2,1746,5572),('88a8aca33dfffff','São Geraldo',59,82,62,30,63,0.33,0.3,86,3702,'ZEIS',4.0,1792,5200),('88a8aca32bfffff','Belo Horizonte',61,71,63,67,70,0.29,0.24,35,3341,'ZI-1',1.8,1258,3386),('88a8aca321fffff','Pinheirinho',59,75,58,42,75,0.27,0.14,77,3983,'ZPA',3.3,1631,4200),('88a8aca325fffff','Cidade Jardim',62,70,73,52,59,0.39,0.18,84,3522,'ZR-2',3.9,198,1487),('88a8acb899fffff','Foch',62,71,63,48,68,0.38,0.18,90,4317,'ZEIS',1.3,1738,2733),('88a8acb891fffff','Jardim Alvorada',58,65,61,51,70,0.31,0.2,69,3111,'ZC-1',1.0,2046,6241),('88a8acb897fffff','Jardim Alvorada',60,62,73,61,57,0.34,0.19,61,3239,'ZC-1',3.2,1910,2467),('88a8aca16dfffff','Cidade Jardim',57,68,61,37,61,0.33,0.21,89,3658,'ZM-3',1.9,1245,6239),('88a8aca165fffff','Jardim Alvorada',49,66,53,27,65,0.39,0.07,31,4107,'ZM-3',1.6,1543,3191),('88a8aca167fffff','Pinheirinho',52,62,58,38,68,0.38,0.08,35,3453,'ZM-3',3.8,549,4606),('88a8aca129fffff','Foch',63,67,56,67,72,0.35,0.16,76,3895,'ZPA',1.8,1005,5368),('88a8aca12bfffff','Faisqueira',51,62,56,36,56,0.36,0.13,64,4123,'ZM-3',2.3,2292,408),('88a8aca13dfffff','Árvore Grande',63,60,52,73,68,0.44,0.22,88,4388,'ZPA',3.4,908,892),('88a8aca139fffff','Santa Rita',62,66,74,38,73,0.4,0.12,92,3459,'ZR-2',3.3,2291,5835),('88a8aca115fffff','São Geraldo',53,65,55,28,77,0.28,0.14,64,4190,'ZI-1',1.1,1173,4732),('88a8aca111fffff','Cidade Jardim',64,75,56,76,69,0.35,0.19,46,3266,'ZPA',2.7,1692,3138),('88a8aca11bfffff','São Geraldo',57,68,54,55,64,0.4,0.22,52,3104,'ZC-1',3.4,1972,1225),('88a8aca025fffff','São Geraldo',60,68,69,31,75,0.39,0.16,89,3937,'ZC-1',1.4,153,4064),('88a8aca02dfffff','Centro',58,76,61,44,59,0.37,0.2,66,3922,'ZI-1',3.4,331,1481),('88a8aca067fffff','Pinheirinho',53,69,64,32,59,0.41,0.22,35,3892,'ZR-2',3.5,2143,3781),('88a8aca061fffff','Centro',57,63,60,51,69,0.31,0.23,64,4436,'ZR-2',1.6,1738,965),('88a8aca06dfffff','Jardim Alvorada',59,68,64,59,69,0.27,0.15,42,3835,'ZPA',2.3,1154,6244),('88a8aca33bfffff','Centro',61,67,69,50,77,0.32,0.23,59,4806,'ZR-2',3.3,452,4166),('88a8aca339fffff','Primavera',61,67,60,56,78,0.29,0.13,77,3685,'ZM-3',3.3,1493,2231),('88a8aca307fffff','São Geraldo',66,63,54,90,67,0.42,0.11,79,4295,'ZI-1',3.6,546,5160),('88a8aca305fffff','Faisqueira',63,70,55,82,58,0.32,0.15,63,4405,'ZI-1',1.2,1390,1354),('88a8aca329fffff','Cidade Jardim',53,59,65,35,60,0.33,0.15,74,3140,'ZC-1',3.2,357,3205),('88a8aca32dfffff','Faisqueira',56,59,53,62,70,0.39,0.14,31,2923,'ZEIS',3.5,2293,3897),('88a8acb8d3fffff','Foch',63,56,64,77,61,0.47,0.18,77,3874,'ZI-1',3.8,1531,1442),('88a8acb8d7fffff','São Geraldo',60,60,48,80,47,0.42,0.07,86,3027,'ZC-1',2.8,821,3533),('88a8acb89dfffff','Centro',60,56,46,78,58,0.44,0.18,82,2969,'ZI-1',2.4,1895,2627),('88a8acb895fffff','São Geraldo',64,59,64,90,51,0.46,0.07,62,4082,'ZI-1',3.7,500,5610),('88a8acb8bbfffff','Primavera',52,57,56,35,56,0.5,0.14,71,3048,'ZR-2',1.0,1179,4239),('88a8acb8b3fffff','Jardim Alvorada',46,56,45,29,60,0.4,0.16,42,3194,'ZM-3',1.2,1432,2018),('88a8acaa59fffff','Belo Horizonte',54,55,47,59,57,0.49,0,55,3617,'ZI-1',3.1,532,5721),('88a8acaa5bfffff','São Geraldo',51,53,46,43,56,0.37,0.01,93,3734,'ZI-1',2.6,1299,6230),('88a8aca12dfffff','Centro',60,53,55,90,61,0.35,0.14,52,2722,'ZPA',3.7,967,2945),('88a8aca121fffff','Belo Horizonte',52,57,59,31,49,0.41,0.09,93,3601,'ZC-1',3.8,2061,2030),('88a8aca123fffff','Santa Rita',53,63,55,37,63,0.41,0.07,60,3952,'ZI-1',2.6,1558,1678),('88a8aca135fffff','Jardim Alvorada',58,54,56,60,64,0.43,0.16,76,2854,'ZPA',1.8,743,5296),('88a8aca131fffff','Cidade Jardim',71,66,71,88,66,0.46,0.09,84,4029,'ZPA',2.0,2101,5184),('88a8aca13bfffff','Jardim Alvorada',55,60,70,49,62,0.37,0.13,30,4160,'ZEIS',3.7,2288,3947),('88a8aca117fffff','Faisqueira',56,58,53,65,65,0.46,0.19,35,3233,'ZM-3',2.6,1083,1764),('88a8aca113fffff','Santa Rita',64,67,62,75,55,0.36,0.18,89,3523,'ZPA',1.2,748,6351),('88a8aca1cdfffff','Faisqueira',66,60,64,91,56,0.46,0.04,77,3867,'ZC-1',2.5,618,1086),('88a8aca027fffff','Santa Rita',57,57,68,40,70,0.47,0.14,60,3994,'ZC-1',1.5,1945,5588),('88a8aca021fffff','São João',59,61,68,70,59,0.33,0.19,39,4207,'ZI-1',2.4,1904,2575),('88a8aca029fffff','Pinheirinho',54,58,73,28,71,0.31,0.09,70,3029,'ZEIS',3.2,1450,4156),('88a8aca063fffff','Jardim Alvorada',48,61,52,27,60,0.44,0.18,42,3913,'ZPA',3.2,650,3328),('88a8aca06bfffff','Foch',56,60,47,60,62,0.39,0.16,67,3941,'ZPA',2.5,2332,2138),('88a8aca069fffff','Belo Horizonte',56,62,61,57,68,0.35,0.09,36,4263,'ZEIS',3.0,402,4826),('88a8aca317fffff','Pinheirinho',60,65,57,58,53,0.44,0.14,93,3883,'ZR-2',1.1,2052,3266),('88a8aca315fffff','Pinheirinho',69,73,74,89,56,0.34,0.2,71,3733,'ZR-2',3.2,947,3380),('88a8aca303fffff','São João',58,70,52,53,71,0.37,0.19,50,4313,'ZPA',3.6,1527,842),('88a8aca301fffff','Jardim Alvorada',66,57,52,95,65,0.45,0.18,82,2844,'ZEIS',3.4,1224,3386);